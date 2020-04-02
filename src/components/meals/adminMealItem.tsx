import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { GetPhoto } from "../../store/actions/imgActions";
import { DeleteMeal } from "../../store/actions/mealActions";

interface Props {
  meal?: iMeal;
  handleActiveMeals: (id: string) => void;
  activeMeals: string[];
}
const MealItem: React.FC<Props> = ({
  meal,
  handleActiveMeals,
  activeMeals
}) => {
  const [safeDelete, setSafeDelete] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  if (typeof meal !== "undefined") {
    const handleDelete = () => {
      if (typeof meal.id !== "undefined") {
        DeleteMeal(meal.id);
        setRedirect(true);
      }
    };
    if (!redirect) {
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

          <div>{/* <img src={img} alt="food" /> */}</div>
          <div>
            <Link to={"/admin/meal/" + meal.id + "/edit"}>
              <button
                onChange={e => {
                  e.preventDefault();
                }}
              >
                Edit
              </button>
            </Link>
          </div>
          <button onClick={() => setSafeDelete(true)}>delete</button>
          {safeDelete ? (
            <div>
              Are you sure you want to delete it?
              <button onClick={() => setSafeDelete(false)}>No</button>
              <button onClick={() => handleDelete()}>yes</button>
            </div>
          ) : null}
        </div>
      );
    } else {
      return <Redirect to={"/admin/meals"} />;
    }
  } else {
    return <></>;
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    DeleteMeal: (docId: string) => dispatch(DeleteMeal(docId)),
    GetPhoto: (path: string) => dispatch(GetPhoto(path))
  };
};
export default connect(null, mapDispatchToProps)(MealItem) as React.FC<Props>;
