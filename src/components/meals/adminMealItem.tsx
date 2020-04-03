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
        <div className="c-adminItem" key={meal.id}>
          <div className="c-adminItem__top">
            <div className="c-adminItem__top__center">
              <h3 className="c-adminItem__title">{meal.name}</h3>
              <p className="c-adminItem__price">€{meal.price}</p>
              <p className="c-adminItem__ingredients">{meal.ingredients}</p>
            </div>
            <div className="c-adminItem__top__right">
              <div className="c-adminItem__characteristics">
                <div className="c-modal-meal__characteristics__item">
                  {meal.isHallal ? (
                    <img
                      src="/check.svg"
                      className="c-modal-meal__characteristics__item__img"
                      alt="Eten is hallal"
                    />
                  ) : (
                    <img
                      src="/close.svg"
                      className="c-modal-meal__characteristics__item__img"
                      alt="Eten is niet hallal"
                    />
                  )}
                  Hallal
                </div>
                <div className="c-modal-meal__characteristics__item">
                  {meal.isVegan ? (
                    <img
                      src="/check.svg"
                      className="c-modal-meal__characteristics__item__img"
                      alt="Eten is vegan"
                    />
                  ) : (
                    <img
                      src="/close.svg"
                      className="c-modal-meal__characteristics__item__img"
                      alt="Eten is niet vegan"
                    />
                  )}
                  Vegan
                </div>
                <div className="c-modal-meal__characteristics__item">
                  {meal.isVegetarian ? (
                    <img
                      src="/check.svg"
                      className="c-modal-meal__characteristics__item__img"
                      alt="Eten is vegetarisch"
                    />
                  ) : (
                    <img
                      src="/close.svg"
                      className="c-modal-meal__characteristics__item__img"
                      alt="Eten is niet vegetarisch"
                    />
                  )}
                  Vegetarisch
                </div>
              </div>
            </div>
          </div>
          <div className="c-adminItem__bottom">
            <div className="c-adminItem__activeBox">
              <label className="checkbox-container">
                <label className="o-inputfield__sublabel">Actief?</label>
                <input
                  type="checkbox"
                  checked={activeMeals.some(
                    (mealId: any) => mealId === meal.id
                  )}
                  onChange={() =>
                    handleActiveMeals(
                      typeof meal.id !== "undefined" ? meal.id : ""
                    )
                  }
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="c-adminItem__buttons">
              <Link to={"/admin/meal/" + meal.id + "/edit"}>
                <button
                  onChange={e => {
                    e.preventDefault();
                  }}
                >
                  Edit
                </button>
              </Link>
              <button onClick={() => setSafeDelete(true)}>delete</button>
              {safeDelete ? (
                <div className="c-adminItem__popup">
                  Are you sure you want to delete it?
                  <button onClick={() => setSafeDelete(false)}>No</button>
                  <button onClick={() => handleDelete()}>yes</button>
                </div>
              ) : null}
            </div>
          </div>
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
