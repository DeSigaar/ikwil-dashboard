import React, { useState } from "react";
import { connect } from "react-redux";
import { createActivity } from "../../../store/actions/activitiesActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

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
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [category, setSelectedCategory] = useState<string>("geen");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createActivity(
      { name, startTime, endTime, room, category },
      profile,
      userId
    );
  };

  let options = [<option value="geen">Select</option>];

  if (typeof categories !== "undefined") {
    categories.forEach(category => {
      options.push(<option value={category.id}>{category.name}</option>);
    });
  }
  return (
    <div>
      <h2>Toevoegen</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          Naam
          <input
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          Tijden
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
        <div>
          Locatie
          <input
            required
            value={room}
            onChange={e => setRoom(e.target.value)}
          />
        </div>
        <div>
          Categorie
          <select
            value={category}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {options}
          </select>
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
    createActivity: (activity: iActivity, profile: any, userId: string) =>
      dispatch(createActivity(activity, profile, userId))
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
