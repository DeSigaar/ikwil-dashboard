import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { DeleteRule } from "../../../store/actions/ruleActions";
import { Redirect } from "react-router-dom";
interface Props {
  link: any;
  rule?: iRule;
}

const Rule: React.FC<Props> = ({ rule, link }) => {
  const [safeDelete, setSafeDelete] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  if (typeof rule !== "undefined") {
    const handleDelete = () => {
      if (typeof rule.id !== "undefined") {
        //TO:DO Netter maker
        DeleteRule(rule.id);
        setRedirect(true);
      } else {
        alert("oeps");
      }
    };
    if (!redirect) {
      return (
        <div>
          <h2>Regel</h2>
          <p>{rule.name}</p>
          <p>{rule.createdBy}</p>

          <Link to={link.url + "/edit"}>edit</Link>
          <button onClick={() => setSafeDelete(true)}>delete</button>
          {safeDelete ? (
            <div>
              Are you sure you want to delete it?
              <button onClick={() => setSafeDelete(false)}>No</button>
              <button onClick={() => handleDelete()}>yes</button>
            </div>
          ) : null}
        </div>
      );
    } else {
      return <Redirect to={"/rule"} />;
    }
  } else {
    return null;
  }
};
const mapStateToProps = (state: any) => {
  if (typeof state.firestore.ordered.rules !== "undefined") {
    return { rule: state.firestore.ordered.rules[0] };
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    DeleteRule: (docId: string) => dispatch(DeleteRule(docId))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "rules", doc: props.link.params.id }
  ])
)(Rule) as React.FC<Props>;
