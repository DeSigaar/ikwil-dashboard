import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

interface Props {
  link: any;
  activity?: iActivity;
}

const Activity: React.FC<Props> = ({ activity }) => {
  if (typeof activity !== "undefined") {
    return <div>{activity.name}</div>;
  } else {
    return null;
  }
};
const mapStateToProps = (state: any) => {
  if (typeof state.firestore.ordered.activities !== "undefined") {
    return { activity: state.firestore.ordered.activities[0] };
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props: Props) => [
    { collection: "activities", doc: props.link.params.id }
  ])
)(Activity) as React.FC<Props>;
