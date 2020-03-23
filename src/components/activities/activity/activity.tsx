import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { DeleteActivity } from "../../../store/actions/activitiesActions";
import { Redirect } from "react-router-dom";
import { getSecondPart } from "../../../functions/stringSplitting";
import { useFirestore } from "react-redux-firebase";

interface Props {
  link: any;
  data?: any;
}

const Activity: React.FC<Props> = ({ link, data }) => {
  const firestore = useFirestore();

  const [safeDelete, setSafeDelete] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (typeof data.activity.category !== "undefined") {
      let test = firestore
        .collection("categories")
        .doc(getSecondPart(data.activity.category, "/"))
        .get()
        .then((aa: any) => console.log("aa", aa));
      console.log("test :", test);
    }
  }, [data.activity]);

  if (typeof data.activity !== "undefined") {
    const handleDelte = () => {
      if (typeof data.activity.id !== "undefined") {
        //TO:DO Netter maker
        DeleteActivity(data.activity.id);
        setRedirect(true);
      } else {
        alert("oeps");
      }
    };
    const { activity, category } = data;
    if (!redirect) {
      return (
        <div>
          <div>
            <h2>Activity stuff</h2>
            <div>{activity.name}</div>
            <div>
              <div>{activity.endTime}</div>
              tot
              <div>{activity.startTime}</div>
            </div>
            <div>{activity.room}</div>
            <div>{activity.createdBy}</div>
          </div>
          {category !== {} && category !== undefined ? (
            <div>
              <h2>Category stuff</h2>
              <div>{category.name}</div>
              <div>{category.bio}</div>
              <div>{category.color}</div>
              <div>{category.icon}</div>
            </div>
          ) : null}

          <Link to={link.url + "/edit"}>edit</Link>
          <button onClick={() => setSafeDelete(true)}>delete</button>
          {safeDelete ? (
            <div>
              Are you sure you want to delete it?
              <button onClick={() => setSafeDelete(false)}>No</button>
              <button onClick={() => handleDelte()}>yes</button>
            </div>
          ) : null}
        </div>
      );
    } else {
      return <Redirect to={"/" + link.params.id} />;
    }
  } else {
    return null;
  }
};
const mapStateToProps = (state: any) => {
  let activity = {};
  let category = {};
  let data = { activity: {}, category: {} };
  if (typeof state.firestore.ordered.activities !== "undefined") {
    activity = state.firestore.ordered.activities[0];
  }
  if (typeof state.firestore.ordered.categories !== "undefined") {
    category = state.firestore.ordered.categories[0];
  }
  data.activity = activity;
  data.category = category;
  return {
    data
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    DeleteActivity: (docId: string) => dispatch(DeleteActivity(docId))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "activities", doc: props.link.params.id }
    // {
    //   collection: "categories",
    //   doc: `${
    //     typeof props.data.activity.category !== "undefined"
    //       ? getSecondPart(props.data.activity.category, "/")
    //       : "none"
    //   }`
    // }
    //TO:DO betere manier vinden
  ])
)(Activity) as React.FC<Props>;
