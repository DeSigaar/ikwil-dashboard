import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Summary from "./summary";
// import Create from "./newsItem/create";
interface Props {
  data?: iNewsItem[];
}

const News: React.FC<Props> = ({ data }) => {
  return (
    <div id="news" className="s-card-small">
      <Summary data={data} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    data: state.firestore.ordered.news,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "news",
    },
  ])
)(News) as React.FC;
