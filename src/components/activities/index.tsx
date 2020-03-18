import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Summary from "./summary";
import Create from "./create";
interface Props {
  data?: iActivity[];
}

const Activities: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <Summary data={data} />
      <Create />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    data: state.firestore.ordered.activities
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
