import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { EditMeal } from "../../store/actions/mealActions";
import { Link } from "react-router-dom";
import { DeleteMeal } from "../../store/actions/mealActions";
interface Props {
  meals: iMeal[];
  profile?: any;
  auth?: any;
}

const SetMeal: React.FC<Props> = ({ meals, profile, auth }) => {
  const [updateMeals, setUpdateMeals] = useState<any>(undefined);
  const [activeMeals, setActiveMeals] = useState<string[]>([]);
  const [safeDelete, setSafeDelete] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string | undefined>("");

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
        setActiveMeals(activeMeals);
      }
    }
  }, [meals, updateMeals]);

  const handleDelete = (mealId: string | undefined) => {
    if (typeof mealId !== "undefined") {
      //TO:DO Netter maker
      DeleteMeal(mealId);
    }
  };

  const handleActiveMeals = (mealId?: string | undefined) => {
    if (typeof mealId !== "undefined") {
      let tempActiveMeals = [...activeMeals];
      let active = false;
      let index = activeMeals.findIndex((mealID: any) => mealID === mealId);
      if (index !== -1) {
        tempActiveMeals.splice(index, 1);
        active = false;
      } else {
        tempActiveMeals.push(mealId);
        active = true;
      }
      setMealActive(mealId, active);
      setActiveMeals(tempActiveMeals);
    }
  };
  const setMealActive = (id: string, active: boolean) => {
    let mealToSet = {
      ...meals.find((meal: any) => meal.id === id),
      isActive: false
    };
    if (typeof mealToSet?.isActive !== "undefined") {
      mealToSet.isActive = active;
    }
    console.log("mealToSet :", mealToSet);
    EditMeal(mealToSet, profile, auth.uid, id);
  };

  if (typeof meals !== "undefined") {
    return (
      <div>
        {meals.map((meal: iMeal) => {
          return (
            <div key={meal.id}>
              <Link to={"meal/" + meal.id}>
                <h3>{meal.name}</h3>
              </Link>
              <div>
                Actief?
                <input
                  type="checkbox"
                  checked={activeMeals.some(
                    (mealId: any) => mealId === meal.id
                  )}
                  onChange={() => handleActiveMeals(meal.id)}
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
                <button
                  onClick={() => {
                    setSafeDelete(true);
                    setIdToDelete(meal.id);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
        <div>
          <Link to={"/meal/add"}>
            <button
              onChange={e => {
                e.preventDefault();
              }}
            >
              Voeg toe!
            </button>
          </Link>
          {safeDelete ? (
            <div>
              Are you sure you want to delete it?
              <button onClick={() => setSafeDelete(false)}>No</button>
              <button
                onClick={() => {
                  handleDelete(idToDelete);
                  setSafeDelete(false);
                }}
              >
                yes
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    return <div>No meals found!</div>;
  }
};

const mapStateToProps = (state: any) => {
  return {
    meals: state.firestore.ordered.meals,
    profile: state.firebase.profile,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    EditMeal: (meal: any, profile: any, id: string, docId: string) =>
      dispatch(EditMeal(meal, profile, id, docId)),
    DeleteMeal: (docId: string) => dispatch(DeleteMeal(docId))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "meals" }])
)(SetMeal) as React.FC<Props>;
