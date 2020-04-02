import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Summary from "./summary";

interface Props {
  meals: iMeal[];
}

const Meals: React.FC<Props> = ({ meals }) => {
  return (
    <div>
      <Summary meals={meals} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    meals: state.firestore.ordered.meals
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "meals"
    }
  ])
)(Meals) as React.FC;
