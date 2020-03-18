import React, { useState } from "react";
import { connect } from "react-redux";
import { createActivity } from "../../../store/actions/activitiesActions";

const CreateActivity: React.FC = props => {
  const [name, setName] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createActivity(name);
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
const mapDispatchToProps = (dispatch: any) => {
  return {
    createActivity: (activity: any) => dispatch(createActivity(activity))
  };
};
export default connect(null, mapDispatchToProps)(CreateActivity);
