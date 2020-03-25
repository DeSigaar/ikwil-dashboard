import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { EditRule } from "../../../store/actions/ruleActions";
import { Redirect } from "react-router-dom";

interface Props {
  link?: any;
  profile?: any;
  rule?: iRule;
  auth?: any;
}

const Edit: React.FC<Props> = ({ rule, auth, profile, link }) => {
  const [name, setName] = useState<string>("");
  const [userRule, setUserRule] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  useEffect(() => {
    if (typeof rule !== "undefined") {
      setName(rule.name);
      setUserRule(rule.rule);
    }
  }, [rule]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    EditRule({ name, rule }, profile, auth.uid, link.params.id);
    setRedirect(true);
  };
  if (typeof rule !== "undefined") {
    if (!redirect) {
      return (
        <>
          <h2>Edit</h2>
          <form onSubmit={e => handleSubmit(e)}>
            <div>
              naam
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
                value={userRule}
                onChange={e => setUserRule(e.target.value)}
              />
            </div>
            <button>update</button>
          </form>
        </>
      );
    } else {
      return <Redirect to={"/rule/" + link.params.id} />;
    }
  } else {
    return <>Error</>;
  }
};
const mapStateToProps = (state: any) => {
  if (typeof state.firestore.ordered.rules !== "undefined") {
    return {
      organizer: state.firestore.ordered.rules[0],
      profile: state.firebase.profile,
      auth: state.firebase.auth
    };
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    EditRule: (rule: any, profile: any, id: string, docId: string) =>
      dispatch(EditRule(rule, profile, id, docId))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "rules", doc: props.link.params.id }
  ])
)(Edit) as React.FC<Props>;
