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
        <div className="c-adminItem">
          <div className="c-adminItem__top">
            <div className="c-adminItem__top__left">
              <div className="c-adminItem__image">
                <img src={imgPreview} alt="preview" />
              </div>
            </div>
            <div className="c-adminItem__top__center">
              <h3 className="c-adminItem__title">{organizer.name}</h3>
              <p className="c-adminItem__text">{organizer.description}</p>
              <p className="c-adminItem__bold">{organizer.place}</p>
            </div>
          </div>
          <div className="c-adminItem__bottom">
            <div></div>
            <div className="c-adminItem__buttons">
              <Link to={"organizer/" + organizer.id + "/edit"}>
                <button
                  onChange={e => {
                    e.preventDefault();
                  }}
                >
                  Edit
                </button>
              </Link>
              <button onClick={() => setSafeDelete(true)}>delete</button>
              {safeDelete ? (
                <div className="c-adminItem__popup">
                  Are you sure you want to delete it?
                  <button onClick={() => setSafeDelete(false)}>No</button>
                  <button onClick={() => handleDelete()}>yes</button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to={"/admin/organisers"} />;
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
