import React, { useState } from "react";
import { connect } from "react-redux";
import { createOrganizer } from "../../../store/actions/organizerActions";

interface Props {
  profile: any;
  userId: string;
}

const Create: React.FC<Props> = ({ profile, userId }) => {
  const [name, setName] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createOrganizer({ name, isAvailable }, profile, userId);
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
          Beschikbaar
          <input
            required
            type="checkbox"
            checked={isAvailable}
            onChange={e => setIsAvailable(!isAvailable)}
          />
        </div>
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
    createOrganizer: (organizer: any, profile: any, userId: string) =>
      dispatch(createOrganizer(organizer, profile, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
