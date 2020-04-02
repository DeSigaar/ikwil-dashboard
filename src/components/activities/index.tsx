import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Summary from "./summary";
// import Create from "./activity/create";
interface Props {
  activities?: iActivity[];
  isLoggedIn: boolean;
}

const Activities: React.FC<Props> = ({ activities, isLoggedIn }) => {
  return (
    <div id="activities" className="s-card-big">
      <Summary activities={activities} />
      {/* {isLoggedIn ? <Create /> : null} */}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  let isLoggedIn = false;
  if (!state.firebase.profile.isEmpty) {
    isLoggedIn = true;
  }
  return {
    activities: state.firestore.ordered.activities,
    isLoggedIn
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "activities",
      where: [["__deleted", "==", false]]
    }
  ])
)(Activities) as React.FC;
