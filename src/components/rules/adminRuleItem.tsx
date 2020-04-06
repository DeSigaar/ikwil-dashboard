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
        <div className="c-adminItem" key={rule.id}>
          <div className="c-adminItem__top">
            <div className="c-adminItem__top__left">
              <h3 className="c-adminItem__title">{rule.name}</h3>
              <p className="c-adminItem__text">{rule.rule}</p>
              <p className="c-adminItem__bold">
                gepubliceerd door: {rule.createdBy}
              </p>
            </div>
          </div>
          <div className="c-adminItem__bottom">
            <div></div>
            <div className="c-adminItem__buttons">
              <Link to={"/admin/rule/" + rule.id + "/edit"}>
                <button
                  onChange={e => {
                    e.preventDefault();
                  }}
                >
                  Edit
                </button>
              </Link>
              <button onClick={() => setSafeDelete(true)}>delete</button>
              {safeDelete ? (
                <div className="c-adminItem__popup">
                  Are you sure you want to delete it?
                  <button onClick={() => setSafeDelete(false)}>No</button>
                  <button onClick={() => handleDelete()}>yes</button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to={"/admin/rules"} />;
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
