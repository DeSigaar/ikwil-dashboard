import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import Activity from "./adminActivityItem";
import Activities from "./index";

interface Props {
  activities: iActivity[];
  profile?: any;
  auth?: any;
}

const Admin: React.FC<Props> = ({ activities, profile, auth }) => {
  if (typeof activities !== "undefined") {
    return (
      <div className="s-admin">
        <div className="s-admin__preview">
          <div>
            <h1>Voorbeeld</h1>
            <Activities />
          </div>
        </div>
        <div className="s-admin__container">
          <div className="s-admin__container__top">
            <h2>Activiteiten</h2>
            <Link to={"/admin/activity/add"}>
              <button
                onChange={e => {
                  e.preventDefault();
                }}
              >
                Activitiet toevoegen
              </button>
            </Link>
          </div>
          <div className="s-admin__container__items">
            {activities.map((activity: any) => {
              return (
                <div key={activity.id}>
                  <Activity activity={activity} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No activities found!</div>;
  }
};

const mapStateToProps = (state: any) => {
  return {
    activities: state.firestore.ordered.activities,
    profile: state.firebase.profile,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "activities" }])
)(Admin) as React.FC<Props>;
