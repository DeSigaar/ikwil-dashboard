import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Summary from "./summary";
interface Props {
  activities?: iActivity[];
}

const Activities: React.FC<Props> = ({ activities }) => {
  return (
    <div id="activities" className="s-card-big">
      <Summary activities={activities} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    activities: state.firestore.ordered.activities,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "activities",
      where: [["__deleted", "==", false]],
    },
  ])
)(Activities) as React.FC;
