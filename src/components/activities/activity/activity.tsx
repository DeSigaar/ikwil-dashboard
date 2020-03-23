import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { DeleteActivity } from "../../../store/actions/activitiesActions";
import { Redirect } from "react-router-dom";
interface Props {
  link: any;
  activity?: iActivity;
}

const Activity: React.FC<Props> = ({ activity, link }) => {
  const [safeDelete, setSafeDelete] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  if (typeof activity !== "undefined") {
    const handleDelte = () => {
      if (typeof activity.id !== "undefined") {
        //TO:DO Netter maker
        DeleteActivity(activity.id);
        setRedirect(true);
      } else {
        alert("oeps");
      }
    };
    if (!redirect) {
      return (
        <div>
          <h2>Activity</h2>
          <p>{activity.name}</p>
          <div>
            <p>{activity.endTime}</p>
            tot
            <p>{activity.startTime}</p>
          </div>
          <p>{activity.room}</p>
          <p>{activity.createdBy}</p>

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
  if (typeof state.firestore.ordered.activities !== "undefined") {
    return { activity: state.firestore.ordered.activities[0] };
  }
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
  ])
)(Activity) as React.FC<Props>;
