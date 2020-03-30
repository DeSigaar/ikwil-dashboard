import React, { useState } from "react";
import { connect } from "react-redux";
import { createOrganizer } from "../../../store/actions/organizerActions";

interface Props {
  profile: any;
  userId: string;
}

const Create: React.FC<Props> = ({ profile, userId }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createOrganizer({ name, description, place, isAvailable }, profile, userId);
  };
  return (
    <div className="s-cms">
      <div className="s-cms__form-conatiner">
        <h2 className="s-cms__header">Toevoegen bestuurslid</h2>
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
            <label>Beschrijving van je werkzaamheden</label>
            <input
              className="o-inputfield__input"
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="o-inputfield">
            <label>Plaats waar je het meeste bent</label>
            <input
              className="o-inputfield__input"
              required
              value={place}
              onChange={e => setPlace(e.target.value)}
            />
          </div>
          <div className="o-inputfield">
            <label className="checkbox-container">
              <label>Beschikbaar</label>
              <input
                required
                type="checkbox"
                checked={isAvailable}
                onChange={e => setIsAvailable(!isAvailable)}
              />
              <span className="checkmark"></span>
            </label>
          </div>
          <button>Plaats bestuurslid</button>
        </form>
      </div>
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
    createOrganizer: (organizer: any, profile: any, userId: string) =>
      dispatch(createOrganizer(organizer, profile, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
