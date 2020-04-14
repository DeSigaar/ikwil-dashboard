import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import OrganizerItem from "./adminOrganizer";
import Organisers from "./index";

interface Props {
  organisers: iOrganizer[];
  profile?: any;
  auth?: any;
}

const Admin: React.FC<Props> = ({ organisers, profile, auth }) => {
  if (typeof organisers !== "undefined") {
    return (
      <div className="s-admin">
        <div className="s-admin__preview">
          <div>
            <h1>Voorbeeld</h1>
            <Organisers />
          </div>
        </div>
        <div className="s-admin__container">
          <div className="s-admin__container__top">
            <h2>Coördinatoren</h2>
            <Link to={"/admin/organizer/add"}>
              <button
                onChange={e => {
                  e.preventDefault();
                }}
              >
                Coördinator toevoegen
              </button>
            </Link>
          </div>
          <div className="s-admin__container__items">
            {organisers.map((organizer: any) => {
              return (
                <div key={organizer.id}>
                  <OrganizerItem organizer={organizer} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No Organisers found!</div>;
  }
};

const mapStateToProps = (state: any) => {
  return {
    organisers: state.firestore.ordered.organisers,
    profile: state.firebase.profile,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "organisers" }])
)(Admin) as React.FC<Props>;
