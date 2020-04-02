import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { GetPhoto } from "../../../store/actions/imgActions";

interface Props {
  meal?: iMeal;
  isMoving: boolean;
}
const ActiveMealItem: React.FC<Props> = ({ meal, isMoving }) => {
  if (typeof meal !== "undefined") {
    return (
      <div
        className="c-meal__link"
        key={1}
        onClick={e => {
          if (isMoving === true) {
            e.preventDefault();
          }
        }}
      >
        <div className="c-meal">
          {/* <img src={img} className="c-meal__icon" alt="Maaltijd van de dag" /> */}
          <h2 className="c-meal__title">{meal.name}</h2>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    GetPhoto: (path: string) => dispatch(GetPhoto(path))
  };
};
export default connect(null, mapDispatchToProps)(ActiveMealItem) as React.FC<
  Props
>;
