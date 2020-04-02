import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { EditOrganizer } from "../../../store/actions/organizerActions";
import { Redirect } from "react-router-dom";
import { GetPhoto } from "../../../store/actions/imgActions";

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
  const [img, setImg] = useState<any>(undefined);
  const [imgPreview, setImgPreview] = useState<any>(undefined);
  const [imgRef, setImgRef] = useState<string>("");

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
      if (typeof organizer.img !== "undefined") {
        setImgRef(organizer.img);
      }
      GetPhoto(organizer.img)?.then((res: any) => {
        setImgPreview(res);
      });
    }
  }, [organizer]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    EditOrganizer(
      { name, description, place, isAvailable },
      profile,
      auth.uid,
      link.params.id,
      imgRef,
      img
    );
    setRedirect(true);
  };
  const handleImageUpload = (e: any) => {
    e.preventDefault();
    if (typeof e.target.files[0] !== "undefined") {
      setImgPreview(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    }
  };
  if (typeof organizer !== "undefined") {
    if (!redirect) {
      return (
        <div className="s-cms">
          <div className="s-cms__form-conatiner">
            <h2 className="s-cms__header">Bewerken</h2>
            <form onSubmit={e => handleSubmit(e)}>
              <div className="o-inputfield">
                <label>Naam</label>
                <input
                  className="o-inputfield__input"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="o-inputfield">
                <label>Beschrijving van je werkzaamheden</label>
                <input
                  className="o-inputfield__input"
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className="o-inputfield">
                <label>Plaats waar je het meeste bent</label>
                <input
                  className="o-inputfield__input"
                  value={place}
                  onChange={e => setPlace(e.target.value)}
                />
              </div>
              <div className="o-inputfield">
                <label className="checkbox-container">
                  <label>Beschikbaar</label>
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={e => setIsAvailable(!isAvailable)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="o-inputfield">
                <label>Afbeelding toevoegen</label>
                <img
                  className="o-inputfield__upload-preview"
                  src={imgPreview}
                  alt="preview"
                />
                <input
                  className="o-inputfield__file-upload"
                  type="file"
                  name="imgToUpload"
                  id="imgToUplaod"
                  onChange={e => handleImageUpload(e)}
                />
              </div>
              <button>update bestuurslid</button>
            </form>
          </div>
        </div>
      );
    } else {
      return <Redirect to={"/admin/organizer/"} />;
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
  } else {
    return {};
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    EditOrganizer: (
      organizer: any,
      profile: any,
      id: string,
      docId: string,
      imgPath: string,
      img?: any
    ) => dispatch(EditOrganizer(organizer, profile, id, docId, imgPath, img)),
    GetPhoto: (path: string) => dispatch(GetPhoto(path))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "organizer", doc: props.link.params.id }
  ])
)(Edit) as React.FC<Props>;
