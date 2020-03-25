import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { EditOrganizer } from "../../../store/actions/organizerActions";
import { Redirect } from "react-router-dom";

interface Props {
  link?: any;
  profile?: any;
  organizer?: iOrganizer;
  auth?: any;
}

const Edit: React.FC<Props> = ({ organizer, auth, profile, link }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  useEffect(() => {
    if (typeof organizer !== "undefined") {
      setName(organizer.name);
      setDescription(organizer.description);
      if (typeof organizer.place !== "undefined") {
        setPlace(organizer.place);
      }
      if (typeof organizer.isAvailable !== "undefined") {
        setIsAvailable(organizer.isAvailable);
      }
    }
  }, [organizer]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    EditOrganizer(
      { name, description, place, isAvailable },
      profile,
      auth.uid,
      link.params.id
    );
    setRedirect(true);
  };
  if (typeof organizer !== "undefined") {
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
              Beschrijving van je werk
              <input
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div>
              Plaats waar je het meeste bent
              <input
                required
                value={place}
                onChange={e => setPlace(e.target.value)}
              />
            </div>
            <div>
              Beschikbaar
              <input
                required
                type="checkbox"
                checked={isAvailable}
                onChange={e => setIsAvailable(!isAvailable)}
              />
            </div>
            <button>update</button>
          </form>
        </>
      );
    } else {
      return <Redirect to={"/organizer/" + link.params.id} />;
    }
  } else {
    return <>Error</>;
  }
};
const mapStateToProps = (state: any) => {
  if (typeof state.firestore.ordered.organisers !== "undefined") {
    return {
      organizer: state.firestore.ordered.organisers[0],
      profile: state.firebase.profile,
      auth: state.firebase.auth
    };
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    EditOrganizer: (organizer: any, profile: any, id: string, docId: string) =>
      dispatch(EditOrganizer(organizer, profile, id, docId))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "organizer", doc: props.link.params.id }
  ])
)(Edit) as React.FC<Props>;
