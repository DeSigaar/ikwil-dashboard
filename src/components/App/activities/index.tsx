import React from "react";
import { connect } from "react-redux";

const Activities: React.FC = props => {
  console.log("props :", props);
  return <div>Test</div>;
};
const mapStateToProps = (state: any) => {
  return {
    activities: state.activities.activities
  };
};
export default connect(mapStateToProps)(Activities);
