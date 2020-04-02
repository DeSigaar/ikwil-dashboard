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
      <div>
        <Rules />
        {rules.map((rule: any) => {
          return (
            <div key={rule.id}>
              <RuleItem rule={rule} />
            </div>
          );
        })}
        <div>
          <Link to={"/admin/rules/add"}>
            <button
              onChange={e => {
                e.preventDefault();
              }}
            >
              Voeg toe!
            </button>
          </Link>
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
