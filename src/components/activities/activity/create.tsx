import React, { useState } from "react";
import { connect } from "react-redux";
import { createActivity } from "../../../store/actions/activitiesActions";

interface Props {
  profile: any;
  userId: string;
}

const CreateActivity: React.FC<Props> = ({ profile, userId }) => {
  const [name, setName] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createActivity({ name, startTime, endTime, room }, profile, userId);
  };
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
          <select>
            <option value="catExercise">Beweging</option>
            <option value="catCreative">Creatief</option>
            <option value="catKids">Kinderen</option>
            <option value="catSocial">Sociaal</option>
            <option value="catSpiritual">Spiritueel</option>
            <option value="catLanguage">Taal</option>
          </select>
        </div>
        Kartrekkers
        <button>submit</button>
      </form>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    profile: state.firebase.profile,
    userId: state.firebase.auth.uid
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    createActivity: (activity: any, profile: any, userId: string) =>
      dispatch(createActivity(activity, profile, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity);
