import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { GetPhoto } from "../../../store/actions/imgActions";

interface Props {
  meal?: iMeal;
  isMoving: boolean;
}
const ActiveMealItem: React.FC<Props> = ({ meal, isMoving }) => {
  const [img, setImg] = useState<string>(
    "https://firebasestorage.googleapis.com/v0/b/stichting-ik-wil.appspot.com/o/images%2Fmeals%2Fdefault.png?alt=media&token=5886c40a-8030-4d7a-b644-c80acb185837"
  );
  useEffect(() => {
    if (typeof meal !== "undefined") {
      if (typeof meal.img !== "undefined") {
        GetPhoto(meal.img)?.then((res: any) => {
          setImg(res);
        });
      }
    }
  });
  if (typeof meal !== "undefined") {
    return (
      <div
        className="c-meal__link"
        key={meal.id}
        onClick={e => {
          if (isMoving === true) {
            e.preventDefault();
          }
        }}
      >
        <div className="c-meal">
          <img src={img} className="c-meal__icon" alt="Maaltijd van de dag" />
          <h2 className="c-meal__title">{meal.name}</h2>
        </div>
      </div>
    );
  } else {
    return <div>oopsie</div>;
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
