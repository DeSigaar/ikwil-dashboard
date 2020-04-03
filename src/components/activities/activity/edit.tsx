import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { EditActivity } from "../../../store/actions/activitiesActions";
import { Redirect } from "react-router-dom";
import { getSecondPart } from "../../../functions/stringSplitting";
import { Link } from "react-router-dom";
import Days from "../../common/days/index";
import days from "../../../models/daysModel";

interface Props {
  link?: any;
  profile?: any;
  activity?: iActivity;
  auth?: any;
  categories?: iCategory[];
  organisers?: iOrganizer[];
}

const ActivityEdit: React.FC<Props> = ({
  activity,
  auth,
  profile,
  link,
  categories,
  organisers
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const [category, setSelectedCategory] = useState<string>("geen");
  const [activeOrganisers, setActiveOrganisers] = useState<string[]>([]);
  const [stateDays, setDaysState] = useState<iDay[]>([]);
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [once, setOnce] = useState<boolean>(false);

  useEffect(() => {
    if (typeof activity !== "undefined") {
      setName(activity.name);
      setDescription(activity.description);
      setRoom(activity.room);
      setSelectedCategory(getSecondPart(activity.category, "/"));
      let arr: string[] = [];
      activity.organisers.forEach(organizer => {
        arr.push(getSecondPart(organizer, "/"));
        setActiveOrganisers(arr);
      });

      if (typeof activity.days === "undefined") {
        setOnce(true);
      } else {
        setOnce(false);
      }

      if (typeof activity.day !== "undefined") {
        setStartTime(activity.day.startTime);
        setEndTime(activity.day.startTime);
        setDate(activity.day.date);
        setOnce(true);
      }
      if (typeof activity.days !== "undefined") {
        setDaysState(activity.days);
      } else {
        setDaysState(days);
      }
    }
  }, [activity]);

  const setDays = (day: iDay) => {
    let arr = [...stateDays];
    if (arr.filter((tempDay: iDay) => tempDay.name === day.name).length === 0) {
      arr.push(day);
    } else {
      let index = arr.findIndex((tempDay: iDay) => tempDay.name === day.name);
      arr[index] = day;
    }
    setDaysState(arr);
  };
  let categoryOptions = [
    <option key="noKey" value="geen">
      Select
    </option>
  ];
  if (typeof categories !== "undefined") {
    categories.forEach(category =>
      categoryOptions.push(
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      )
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let organisers: string[] = [];
    let dayToPush: iOnce | undefined = undefined;
    let daysToPush: iDay[] | undefined = undefined;

    activeOrganisers.forEach(ref => {
      organisers.push("organisers/" + ref);
    });
    if (once) {
      dayToPush = { date, startTime, endTime };
      daysToPush = undefined;
    } else {
      daysToPush = stateDays;
      dayToPush = undefined;
    }
    EditActivity(
      { name, description, room, category, organisers },
      profile,
      auth.uid,
      link.params.id,
      dayToPush,
      daysToPush
    );
    setRedirect(true);
  };

  let organisersOptions: any = [];
  if (typeof organisers !== "undefined") {
    organisers.forEach(organizer => {
      if (typeof organizer.id !== "undefined") {
        organisersOptions.push(
          <div key={organizer.id}>
            <label className="checkbox-container">
              <label className="o-inputfield__sublabel">{organizer.name}</label>
              <input
                type="checkbox"
                checked={activeOrganisers.includes(organizer.id)}
                onChange={e => handleActiveOrganisers(e, organizer.id)}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        );
      }
    });
  }

  const handleActiveOrganisers = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | undefined
  ) => {
    let tempActiveOrganisers = [...activeOrganisers];
    if (typeof id !== "undefined") {
      if (tempActiveOrganisers.includes(id)) {
        tempActiveOrganisers.splice(
          tempActiveOrganisers.findIndex(item => item === id),
          1
        );
      } else {
        tempActiveOrganisers.push(id);
      }
      setActiveOrganisers(tempActiveOrganisers);
    }
  };
  if (typeof activity !== "undefined") {
    if (!redirect) {
      return (
        <div className="s-cms">
          <div className="s-cms__form-conatiner">
            <h2 className="s-cms__header">Bewerken</h2>
            <form onSubmit={e => handleSubmit(e)}>
              <div className="o-inputfield">
                <label className="o-inputfield__label">Naam</label>
                <input
                  className="o-inputfield__input"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="o-inputfield">
                <label className="o-inputfield__label">Beschrijving</label>
                <input
                  className="o-inputfield__input"
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className="o-inputfield">
                <label className="o-inputfield__label">Locatie</label>
                <input
                  className="o-inputfield__input"
                  required
                  value={room}
                  onChange={e => setRoom(e.target.value)}
                />
              </div>
              {organisersOptions.length === 0 ? (
                <div>
                  Er zijn nog geen kartrekkers toegevoegd. Klik
                  <Link to="/admin/organizer/add">hier</Link> om ze toe te
                  voegen
                </div>
              ) : (
                <div> {organisersOptions} </div>
              )}
              <div className="o-inputfield">
                <label>Categorie</label>
                <select
                  required
                  value={category}
                  onChange={e => setSelectedCategory(e.target.value)}
                >
                  {categoryOptions}
                </select>
              </div>

              <div className="o-inputfield">
                <label>Tijden</label>
                <label className="checkbox-container">
                  <label className="o-inputfield__sublabel">Eenmalig?</label>
                  <input
                    type="checkbox"
                    checked={once}
                    onChange={() => setOnce(!once)}
                  />
                  <span className="checkmark"></span>
                </label>
                {once ? (
                  <>
                    <div className="o-inputfield">
                      <label>Datum</label>
                      <input
                        className="o-inputfield__input"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                      />
                    </div>
                    <div className="o-inputfield">
                      <label>Tijden</label>
                      <div className="o-inputfield__times">
                        <input
                          className="o-inputfield__input"
                          type="time"
                          value={startTime}
                          onChange={e => setStartTime(e.target.value)}
                        />
                        tot
                        <input
                          className="o-inputfield__input"
                          type="time"
                          value={endTime}
                          onChange={e => setEndTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <Days stateDays={stateDays} setDays={setDays} />
                )}
              </div>

              <button>Update Activiteit</button>
            </form>
          </div>
        </div>
      );
    } else {
      return <Redirect to={"/admin/activities/"} />;
    }
  } else {
    return <>Error</>;
  }
};
const mapStateToProps = (state: any) => {
  if (typeof state.firestore.ordered.activities !== "undefined") {
    return {
      activity: state.firestore.ordered.activities[0],
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      categories: state.firestore.ordered.categories,
      organisers: state.firestore.ordered.organisers
    };
  } else {
    return {};
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    EditActivity: (
      activity: iActivity,
      profile: any,
      id: string,
      docId: string,
      dayToPush: iOnce | undefined,
      daysToPush: iDay[] | undefined,
      organisers: string[]
    ) =>
      dispatch(
        EditActivity(activity, profile, id, docId, dayToPush, daysToPush)
      )
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "activities", doc: props.link.params.id },
    {
      collection: "categories"
    },
    {
      collection: "organisers"
    }
  ])
)(ActivityEdit) as React.FC<Props>;
