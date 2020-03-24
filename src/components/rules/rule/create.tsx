import React, { useState } from "react";
import { connect } from "react-redux";
import { createRule } from "../../../store/actions/ruleActions";

interface Props {
  profile: any;
  userId: string;
}

const Create: React.FC<Props> = ({ profile, userId }) => {
  const [name, setName] = useState<string>("");
  const [rule, setRule] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createRule({ name, rule }, profile, userId);
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
          Regel
          <input
            required
            value={rule}
            onChange={e => setRule(e.target.value)}
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
    createRule: (rule: any, profile: any, userId: string) =>
      dispatch(createRule(rule, profile, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
