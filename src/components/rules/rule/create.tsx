import React, { useState } from "react";
import { connect } from "react-redux";
import { createRule } from "../../../store/actions/ruleActions";
import { Redirect } from "react-router-dom";

interface Props {
  profile: any;
  userId: string;
}

const Create: React.FC<Props> = ({ profile, userId }) => {
  const [name, setName] = useState<string>("");
  const [rule, setRule] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createRule({ name, rule }, profile, userId);
    setRedirect(true);
  };
  return (
    <div className="s-cms">
      <div className="s-cms__form-conatiner">
        <h2 className="s-cms__header">Toevoegen regel</h2>
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
            <label className="o-inputfield__label">Regel</label>
            <input
              className="o-inputfield__input"
              required
              value={rule}
              onChange={e => setRule(e.target.value)}
            />
          </div>

          <button>Plaats regel</button>
        </form>
      </div>
      {redirect ? <Redirect to="/admin/rules" /> : null}
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
