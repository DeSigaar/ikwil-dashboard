import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import RuleItem from "./adminRuleItem";
import Rules from "./index";

interface Props {
  rules: iRule[];
  profile?: any;
  auth?: any;
}

const Admin: React.FC<Props> = ({ rules, profile, auth }) => {
  if (typeof rules !== "undefined") {
    return (
      <div className="s-admin">
        <div className="s-admin__preview">
          <div>
            <h1>Voorbeeld</h1>
            <Rules />
          </div>
        </div>
        <div className="s-admin__container">
          <div className="s-admin__container__top">
            <h2>Huisregels</h2>
            <Link to={"/admin/rule/add"}>
              <button
                onChange={e => {
                  e.preventDefault();
                }}
              >
                Huisregel toevoegen
              </button>
            </Link>
          </div>
          <div className="s-admin__container__items">
            {rules.map((rule: any) => {
              return (
                <div key={rule.id}>
                  <RuleItem rule={rule} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No Rules found!</div>;
  }
};

const mapStateToProps = (state: any) => {
  return {
    rules: state.firestore.ordered.rules,
    profile: state.firebase.profile,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "rules" }])
)(Admin) as React.FC<Props>;
