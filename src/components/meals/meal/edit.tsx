import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { EditMeal } from "../../../store/actions/mealActions";
import { Redirect } from "react-router-dom";

interface Props {
  link?: any;
  profile?: any;
  meal?: iMeal;
  auth?: any;
}

const Edit: React.FC<Props> = ({ meal, auth, profile, link }) => {
  const [name, setName] = useState<string>("");
  const [userMeal, setUserMeal] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  useEffect(() => {
    // if (typeof meal !== "undefined") {
    //   setName(meal.name);
    //   setUserMeal(meal.meal);
    // }
  }, [meal]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    EditMeal({ name, meal }, profile, auth.uid, link.params.id);
    setRedirect(true);
  };
  if (typeof meal !== "undefined") {
    if (!redirect) {
      return (
        <>
          <h2>Edit</h2>
          <form onSubmit={e => handleSubmit(e)}>
            <div>
              naam
              <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              Regel
              <input
                required
                value={userMeal}
                onChange={e => setUserMeal(e.target.value)}
              />
            </div>
            <button>update</button>
          </form>
        </>
      );
    } else {
      return <Redirect to={"/meal/" + link.params.id} />;
    }
  } else {
    return <>Error</>;
  }
};
const mapStateToProps = (state: any) => {
  if (typeof state.firestore.ordered.meals !== "undefined") {
    return {
      organizer: state.firestore.ordered.meals[0],
      profile: state.firebase.profile,
      auth: state.firebase.auth
    };
  }
};
const mapDispatchToProps = (dispatch: any) => {
  // return {
  //   EditMeal: (meal: any, profile: any, id: string, docId: string) =>
  //     dispatch(EditMeal(meal, profile, id, docId))
  // };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "meals", doc: props.link.params.id }
  ])
)(Edit) as React.FC<Props>;
