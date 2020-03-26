import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { DeleteMeal } from "../../../store/actions/mealActions";
import { Redirect } from "react-router-dom";
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
        //TO:DO Netter maker
        DeleteMeal(meal.id);
        setRedirect(true);
      } else {
        alert("oeps");
      }
    };
    if (!redirect) {
      return (
        <div>
          <h2>Regel</h2>
          <p>{meal.name}</p>
          <p>{meal.createdBy}</p>

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
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    DeleteMeal: (docId: string) => dispatch(DeleteMeal(docId))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "meals", doc: props.link.params.id }
  ])
)(Meal) as React.FC<Props>;
