import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { DeleteMeal } from "../../../store/actions/mealActions";
import { Redirect } from "react-router-dom";
import { GetPhoto } from "../../../store/actions/imgActions";

interface Props {
  link: any;
  meal?: iMeal;
}

const Meal: React.FC<Props> = ({ meal, link }) => {
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
        <div>
          <h2>Meal</h2>
          <p>{meal.name}</p>
          <p>{meal.price}</p>
          <p>{meal.ingredients}</p>
          <div>Is Hallal: {meal.isHallal ? <>Ja</> : <>Nee</>}</div>
          <div>Is Vegan: {meal.isVegan ? <>Ja</> : <>Nee</>}</div>
          <div>Is Vegetarian: {meal.isVegetarian ? <>Ja</> : <>Nee</>}</div>
          <p>{meal.createdBy}</p>
          {/* <div>
            <img src={img} alt="food" />
          </div> */}
          <Link to={link.url + "/edit"}>edit</Link>
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
      return <Redirect to={"/meal"} />;
    }
  } else {
    return null;
  }
};
const mapStateToProps = (state: any) => {
  if (typeof state.firestore.ordered.meals !== "undefined") {
    return { meal: state.firestore.ordered.meals[0] };
  } else {
    return {};
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    DeleteMeal: (docId: string) => dispatch(DeleteMeal(docId)),
    GetPhoto: (path: string) => dispatch(GetPhoto(path)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "meals", doc: props.link.params.id },
  ])
)(Meal) as React.FC<Props>;
