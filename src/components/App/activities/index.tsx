import React from "react";
import { connect } from "react-redux";

const Activities: React.FC = props => {
  return <div>test</div>;
};
const mapStateToProps = (state: any) => {
  return {
    activities: state.activities.activities.name
  };
};
export default connect(mapStateToProps)(Activities);
