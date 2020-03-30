import React from "react";
import { Link } from "react-router-dom";

interface Props {
  meal?: iMeal;
  isMoving: boolean;
}
const ActiveMealItem: React.FC<Props> = ({ meal, isMoving }) => {
  if (typeof meal !== "undefined") {
    return (
      <Link
        className="c-meal__link"
        key={1}
        to={"/meal/" + meal.id}
        onClick={e => {
          if (isMoving === true) {
            e.preventDefault();
          }
        }}
      >
        <div className="c-meal">
          <img
            src="/yoga.svg"
            className="c-meal__icon"
            alt="Maaltijd van de dag"
          />
          <h2 className="c-meal__title">{meal.name}</h2>
        </div>
      </Link>
    );
  } else {
    return null;
  }
};
export default ActiveMealItem;
