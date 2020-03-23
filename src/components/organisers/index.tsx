import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Summary from "./summary";
import Create from "./organizer/create";
interface Props {
  data?: iOrganizer[];
  isLoggedIn: boolean;
}

const Organisers: React.FC<Props> = ({ data, isLoggedIn }) => {
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
    data: state.firestore.ordered.organisers,
    isLoggedIn
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "organisers"
    }
  ])
)(Organisers) as React.FC;
