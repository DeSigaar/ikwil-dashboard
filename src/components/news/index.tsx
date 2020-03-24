import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Summary from "./summary";
// import Create from "./newsItem/create";
interface Props {
  data?: iNewsItem[];
  isLoggedIn: boolean;
}

const News: React.FC<Props> = ({ data, isLoggedIn }) => {
  return (
    <>
      <Summary data={data} />
      {/* {isLoggedIn ? <Create /> : null} */}
    </>
  );
};

const mapStateToProps = (state: any) => {
  let isLoggedIn = false;
  if (!state.firebase.profile.isEmpty) {
    isLoggedIn = true;
  }
  return {
    data: state.firestore.ordered.news,
    isLoggedIn
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "news"
    }
  ])
)(News) as React.FC;
