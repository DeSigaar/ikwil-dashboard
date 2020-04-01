import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOrganizer } from "../../store/actions/organizerActions";
import { Redirect } from "react-router-dom";
import { GetPhoto } from "../../store/actions/imgActions";

interface Props {
  organizer?: iOrganizer;
}

const AdminOrganizer: React.FC<Props> = ({ organizer }) => {
  const [safeDelete, setSafeDelete] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [imgPreview, setImgPreview] = useState<any>(undefined);
  useEffect(() => {
    if (typeof organizer !== "undefined") {
      GetPhoto(organizer.img)?.then((res: any) => {
        setImgPreview(res);
      });
    }
  }, [organizer]);
  if (typeof organizer !== "undefined") {
    const handleDelete = () => {
      if (typeof organizer.id !== "undefined") {
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
          <img src={imgPreview} alt="preview" />
          <Link to={"organizer/" + organizer.id + "/edit"}>edit</Link>
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
      return <Redirect to={"/admin/organizer"} />;
    }
  } else {
    return null;
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    DeleteOrganizer: (docId: string) => dispatch(DeleteOrganizer(docId)),
    GetPhoto: (path: string) => dispatch(GetPhoto(path))
  };
};

export default connect(null, mapDispatchToProps)(AdminOrganizer) as React.FC<
  Props
>;
