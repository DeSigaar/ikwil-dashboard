import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { DeleteOrganizer } from "../../../store/actions/organizerActions";
import { Redirect } from "react-router-dom";
import { GetPhoto } from "../../../store/actions/imgActions";

interface Props {
  link: any;
  organizer?: iOrganizer;
}

const Organizer: React.FC<Props> = ({ organizer, link }) => {
  const [safeDelete, setSafeDelete] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [img, setImg] = useState<string>(
    "https://firebasestorage.googleapis.com/v0/b/stichting-ik-wil.appspot.com/o/images%2Fmeals%2Fdefault.png?alt=media&token=5886c40a-8030-4d7a-b644-c80acb185837"
  );
  useEffect(() => {
    if (typeof organizer !== "undefined") {
      if (typeof organizer.img !== "undefined") {
        GetPhoto(organizer.img)?.then((res: any) => {
          setImg(res);
        });
      }
    }
  });
  if (typeof organizer !== "undefined") {
    const handleDelete = () => {
      if (typeof organizer.id !== "undefined") {
        //TO:DO Netter maker
        DeleteOrganizer(organizer.id);
        setRedirect(true);
      }
    };
    if (!redirect) {
      return (
        <div>
          <h2>Organizer</h2>
          <p>{organizer.name}</p>
          <p>{organizer.description}</p>
          <p>{organizer.place}</p>
          <p>{organizer.createdBy}</p>
          <div>
            <img src={img} alt="food" />
          </div>
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
      return <Redirect to={"/organizer"} />;
    }
  } else {
    return null;
  }
};
const mapStateToProps = (state: any) => {
  if (typeof state.firestore.ordered.organisers !== "undefined") {
    return { organizer: state.firestore.ordered.organisers[0] };
  } else {
    return {};
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    DeleteOrganizer: (docId: string) => dispatch(DeleteOrganizer(docId)),
    GetPhoto: (path: string) => dispatch(GetPhoto(path))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "organisers", doc: props.link.params.id }
  ])
)(Organizer) as React.FC<Props>;
