import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

interface Props {
  data?: iActivity[];
}

interface iActivity {
  name?: string;
  id?: string;
}
const Activities: React.FC<Props> = ({ data }) => {
  return (
    <div>
      {typeof data !== "undefined" ? (
        <>
          {data.map(activity => {
            return <div key={activity.id}>{activity.name}</div>;
          })}
        </>
      ) : (
        <></>
      )}
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
