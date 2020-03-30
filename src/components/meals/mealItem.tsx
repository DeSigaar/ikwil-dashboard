import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { GetPhoto } from "../../store/actions/imgActions";

interface Props {
  meal?: iMeal;
  setSafeDelete: (safeDelete: boolean) => void;
  setIdToDelete: (id: string) => void;
  handleActiveMeals: (id: string) => void;
  activeMeals: string[];
}
const MealItem: React.FC<Props> = ({
  meal,
  setSafeDelete,
  setIdToDelete,
  handleActiveMeals,
  activeMeals
}) => {
  // let imgSource = undefined;
  // if (typeof meal.img !== "undefined") {
  //   if (!isRendered) {
  //
  //     });
  //   }
  // }
  const [img, setImg] = useState<string>(
    "https://firebasestorage.googleapis.com/v0/b/stichting-ik-wil.appspot.com/o/images%2Fmeals%2Fdefault.png?alt=media&token=5886c40a-8030-4d7a-b644-c80acb185837"
  );

  useEffect(() => {
    console.log("useeffect :");
    if (typeof meal !== "undefined") {
      console.log("meal :", meal);
      if (typeof meal.img !== "undefined") {
        console.log("img :");
        GetPhoto(meal.img)?.then((res: any) => {
          console.log("res :", res);
          setImg(res);
        });
      }
    }
  });

  if (typeof meal !== "undefined") {
    return (
      <div key={meal.id}>
        <Link to={"meal/" + meal.id}>
          <h3>{meal.name}</h3>
        </Link>
        <div>
          Actief?
          <input
            type="checkbox"
            checked={activeMeals.some((mealId: any) => mealId === meal.id)}
            onChange={() =>
              handleActiveMeals(typeof meal.id !== "undefined" ? meal.id : "")
            }
          />
        </div>
        <div>{meal.price}</div>
        <div>{meal.ingredients}</div>
        <div>Is Hallal: {meal.isHallal ? <>Ja</> : <>Nee</>}</div>
        <div>Is Vegan: {meal.isVegan ? <>Ja</> : <>Nee</>}</div>
        <div>Is Vegetarian: {meal.isVegetarian ? <>Ja</> : <>Nee</>}</div>
        <div>
          <Link to={"/meal/" + meal.id + "/edit"}>
            <button
              onChange={e => {
                e.preventDefault();
              }}
            >
              Edit
            </button>
          </Link>
        </div>
        <div>
          <img src={img} alt="food" />
        </div>

        <div>
          <button
            onClick={() => {
              setSafeDelete(true);
              setIdToDelete(typeof meal.id !== "undefined" ? meal.id : "");
            }}
          >
            delete
          </button>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    GetPhoto: (path: string) => dispatch(GetPhoto(path))
  };
};
export default connect(null, mapDispatchToProps)(MealItem) as React.FC<Props>;
