import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import MealItem from "./adminMealItem";
import Meals from "./index";
import { setActiveMeal } from "../../store/actions/mealActions";

interface Props {
  meals: iMeal[];
  profile?: any;
  auth?: any;
}

const Admin: React.FC<Props> = ({ meals, profile, auth }) => {
  const [updateMeals, setUpdateMeals] = useState<any>(undefined);
  const [activeMealsLocal, setActiveMealsLocal] = useState<string[]>([]);
  useEffect(() => {
    if (typeof meals !== "undefined") {
      if (meals !== updateMeals) {
        setUpdateMeals(meals);
        let activeMeals: any = [];
        meals.forEach(meal => {
          if (meal.isActive) {
            activeMeals.push(meal.id);
          }
        });
        setActiveMealsLocal(activeMeals);
      }
    }
  }, [meals, updateMeals]);

  const handleActiveMeals = (mealId?: string | undefined) => {
    if (typeof mealId !== "undefined") {
      let tempActiveMeals = [...activeMealsLocal];
      let active = false;
      let index = activeMealsLocal.findIndex(
        (mealID: any) => mealID === mealId
      );
      if (index !== -1) {
        tempActiveMeals.splice(index, 1);
        active = false;
      } else {
        tempActiveMeals.push(mealId);
        active = true;
      }
      setActiveMealsLocal(tempActiveMeals);
      setActiveMeal(mealId, active);
    }
  };

  if (typeof meals !== "undefined") {
    return (
      <div className="s-admin">
        <div className="s-admin__preview">
          <div>
            <h1>Voorbeeld</h1>
            <Meals />
          </div>
        </div>
        <div className="s-admin__container">
          <div className="s-admin__container__top">
            <h2>Maaltijden</h2>
            <Link to={"/admin/meal/add"}>
              <button
                onChange={e => {
                  e.preventDefault();
                }}
              >
                Maaltijd toevoegen
              </button>
            </Link>
          </div>
          <div className="s-admin__container__items">
            {meals.map((meal: any) => {
              return (
                <div key={meal.id}>
                  <MealItem
                    meal={meal}
                    handleActiveMeals={handleActiveMeals}
                    activeMeals={activeMealsLocal}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No Meals found!</div>;
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    SetActiveMeal: (id: string, active: boolean) =>
      dispatch(setActiveMeal(id, active))
  };
};

const mapStateToProps = (state: any) => {
  return {
    meals: state.firestore.ordered.meals,
    profile: state.firebase.profile,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "meals" }])
)(Admin) as React.FC<Props>;
