import React, { useState } from "react";
import { connect } from "react-redux";
import { createActivity } from "../../store/actions/activitiesActions";

interface Props {
  profile: any;
  userId: string;
}

const CreateActivity: React.FC<Props> = ({ profile, userId }) => {
  const [name, setName] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createActivity(name, profile, userId);
  };
  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          naam
          <input
            required
            value={name}
            onChange={e => setName(e.target.value)}
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
    createActivity: (activity: any, profile: any, userId: string) =>
      dispatch(createActivity(activity, profile, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity);
