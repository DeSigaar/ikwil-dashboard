import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteRule } from "../../store/actions/ruleActions";
import { Redirect } from "react-router-dom";
interface Props {
  rule?: iRule;
}

const Rule: React.FC<Props> = ({ rule }) => {
  const [safeDelete, setSafeDelete] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  if (typeof rule !== "undefined") {
    const handleDelete = () => {
      if (typeof rule.id !== "undefined") {
        DeleteRule(rule.id);
        setRedirect(true);
      }
    };
    if (!redirect) {
      return (
        <div>
          <h2>Regel</h2>
          <p>{rule.name}</p>
          <p>{rule.createdBy}</p>

          <Link to={"rule/" + rule.id + "/edit"}>edit</Link>
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
      return <Redirect to={"/admin/rule"} />;
    }
  } else {
    return null;
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    DeleteRule: (docId: string) => dispatch(DeleteRule(docId))
  };
};

export default connect(null, mapDispatchToProps)(Rule) as React.FC<Props>;
