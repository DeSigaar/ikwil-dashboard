import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Summary from "./summary";
import Create from "./create";
interface Props {
  data?: iActivity[];
  isLoggedIn: boolean;
}

const Activities: React.FC<Props> = ({ data, isLoggedIn }) => {
  return (
    <div>
      <Summary data={data} />
      {isLoggedIn ? <Create /> : null}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  let isLoggedIn = false;
  if (!state.firebase.profile.isEmpty) {
    isLoggedIn = true;
  }
  return {
    data: state.firestore.ordered.activities,
    isLoggedIn
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "activities"
    }
  ])
)(Activities) as React.FC;
