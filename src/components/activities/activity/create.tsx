import React, { useState } from "react";
import { connect } from "react-redux";
import { createActivity } from "../../../store/actions/activitiesActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Days from "../../common/days/index";
import days from "../../../models/daysModel";
import { Redirect } from "react-router-dom";

interface Props {
  profile: any;
  userId: string;
  categories: iCategory[];
  organisers: iOrganizer[];
}

const Create: React.FC<Props> = ({
  profile,
  userId,
  categories,
  organisers
}) => {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [category, setSelectedCategory] = useState<string>("geen");
  const [activeOrganisers, setActiveOrganisers] = useState<string[]>([]);
  const [stateDays, setDaysState] = useState<iDay[]>(days);
  const [once, setOnce] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  const setDays = (day: iDay) => {
    let arr = stateDays;
    if (
      stateDays.filter((tempDay: iDay) => tempDay.name === day.name).length ===
      0
    ) {
      arr.push(day);
    } else {
      let index = stateDays.findIndex(
        (tempDay: iDay) => tempDay.name === day.name
      );
      arr[index] = day;
    }
    setDaysState(arr);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let organisers: string[] = [];
    let dayToPush: iOnce | undefined = undefined;
    let daysToPush: iDay[] | undefined = undefined;
    let repeats = !once;
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

    createActivity(
      { name, room, category, organisers },
      profile,
      userId,
      dayToPush,
      daysToPush,
      repeats
    );
    setRedirect(true);
  };

  let categoryOptions = [
    <option key="noKey" value="geen">
      Select
    </option>
  ];

  if (typeof categories !== "undefined") {
    categories.forEach(category => {
      categoryOptions.push(
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    });
  }
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
  return (
    <div className="s-cms">
      <div className="s-cms__form-conatiner">
        <h2 className="s-cms__header">Toevoegen</h2>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="o-inputfield">
            <label>Naam</label>
            <input
              className="o-inputfield__input"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="o-inputfield">
            <label>Locatie</label>
            <input
              className="o-inputfield__input"
              required
              value={room}
              onChange={e => setRoom(e.target.value)}
            />
          </div>
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
            <label>Organisers</label>
            {organisersOptions.length === 0 ? (
              <div>
                Er zijn nog geen kartrekkers gevonden! Klik
                <Link to="/organizer">hier</Link> om ze aan te maken!
              </div>
            ) : (
              organisersOptions.map((organizer: any) => {
                return organizer;
              })
            )}
          </div>
          <div className="o-inputfield">
            <label>Wanneer</label>
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
                      required
                      type="time"
                      value={startTime}
                      onChange={e => setStartTime(e.target.value)}
                    />
                    tot
                    <input
                      className="o-inputfield__input"
                      required
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

          <button>Activiteit toevoegen</button>
        </form>
      </div>
      {redirect ? <Redirect to="/activity" /> : null}
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    profile: state.firebase.profile,
    userId: state.firebase.auth.uid,
    categories: state.firestore.ordered.categories,
    organisers: state.firestore.ordered.organisers
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    createActivity: (
      activity: iActivity,
      profile: any,
      userId: string,
      dayToPush: iOnce | undefined,
      daysToPush: iDay[] | undefined,
      repeats: boolean
    ) =>
      dispatch(
        createActivity(
          activity,
          profile,
          userId,
          dayToPush,
          daysToPush,
          repeats
        )
      )
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => [
    {
      collection: "categories"
    },
    {
      collection: "organisers"
    }
  ])
)(Create) as React.FC;
