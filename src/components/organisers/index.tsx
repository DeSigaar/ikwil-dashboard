import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Summary from "./summary";
// import Create from "./organizer/create";
interface Props {
  data?: iOrganizer[];
}

const Organisers: React.FC<Props> = ({ data }) => {
  return (
    <div id="organisers" className="s-card-small">
      <Summary data={data} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    data: state.firestore.ordered.organisers,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "organisers",
    },
  ])
)(Organisers) as React.FC;
