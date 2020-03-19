import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { EditActivity } from "../../store/actions/activitiesActions";
import { Redirect } from "react-router-dom";

interface Props {
  link?: any;
  profile?: any;
  activity?: any;
  auth?: any;
}

const ActivityEdit: React.FC<Props> = ({ activity, auth, profile, link }) => {
  const [name, setName] = useState<string | undefined>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (typeof activity !== "undefined") {
      setName(activity.name);
    }
  }, [activity]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    EditActivity({ name }, profile, auth.uid, link.params.id);
    setRedirect(true);
  };
  if (typeof activity !== "undefined") {
    if (!redirect) {
      return (
        <>
          <form onSubmit={e => handleSubmit(e)}>
            <p>
              <input value={name} onChange={e => setName(e.target.value)} />
            </p>
            <button>update</button>
          </form>
        </>
      );
    } else {
      return <Redirect to={"/activity/" + link.params.id} />;
    }
  } else {
    return <>Error</>;
  }
};
const mapStateToProps = (state: any) => {
  if (typeof state.firestore.ordered.activities !== "undefined") {
    return {
      activity: state.firestore.ordered.activities[0],
      profile: state.firebase.profile,
      auth: state.firebase.auth
    };
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    EditActivity: (activity: any, profile: any, id: string, docId: string) =>
      dispatch(EditActivity(activity, profile, id, docId))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "activities", doc: props.link.params.id }
  ])
)(ActivityEdit) as React.FC<Props>;
