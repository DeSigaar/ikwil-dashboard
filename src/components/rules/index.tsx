import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Summary from "./summary";
// import Create from "./rule/create";
interface Props {
  data?: iRule[];
}

const Rules: React.FC<Props> = ({ data }) => {
  return (
    <div id="rules" className="s-card-small">
      <Summary data={data} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    data: state.firestore.ordered.rules,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "rules",
    },
  ])
)(Rules) as React.FC;
