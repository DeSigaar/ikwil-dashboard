import React, { useState } from "react";
import { connect } from "react-redux";
import { createActivity } from "../../../store/actions/activitiesActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Days from "../../common/days/index";
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
  const [stateDays, setDaysState] = useState<iDay[]>([]);
  const [once, setOnce] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

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
    let datesToPush: any;
    let repeats = !once;
    activeOrganisers.forEach(ref => {
      organisers.push("organisers/" + ref);
    });
    if (once) {
      datesToPush = { date, startTime, endTime };
    } else {
      datesToPush = stateDays;
    }

    createActivity(
      { name, room, category, organisers },
      profile,
      userId,
      datesToPush,
      repeats
    );
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
            <input
              checked={activeOrganisers.includes(organizer.id)}
              onChange={e => handleActiveOrganisers(e, organizer.id)}
              type="checkbox"
            />
            {organizer.name}
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
    <div>
      <h2>Toevoegen</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <h3>Naam</h3>
          <input
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <h3>Locatie</h3>
          <input
            required
            value={room}
            onChange={e => setRoom(e.target.value)}
          />
        </div>
        <div>
          <h3>Categorie</h3>
          <select
            required
            value={category}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {categoryOptions}
          </select>
        </div>
        <div>
          <h3>Organisers</h3>
          {organisersOptions.length === 0 ? (
            <div>
              Er zijn nog geen kartrekkers gevonden! Klik{" "}
              <Link to="/organizer">hier</Link> om ze aan te maken!
            </div>
          ) : (
            organisersOptions.map((organizer: any) => {
              return organizer;
            })
          )}
        </div>
        <div>
          <h3>Wanneer</h3>
          <input
            checked={once}
            onChange={() => setOnce(!once)}
            type="checkbox"
          />
          Eenmalig?
          {once ? (
            <div>
              Datum
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />{" "}
              <div>
                <h3>Tijden</h3>
                <input
                  required
                  type="time"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                />
                tot
                <input
                  required
                  type="time"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <Days setDays={setDays} />
          )}
        </div>

        <button>submit</button>
      </form>
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
      datesToPush: iOnce | iDay[],
      repeats: boolean
    ) =>
      dispatch(createActivity(activity, profile, userId, datesToPush, repeats))
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
