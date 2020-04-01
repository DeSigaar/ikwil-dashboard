import React, { useState } from "react";
import { connect } from "react-redux";
import { createOrganizer } from "../../../store/actions/organizerActions";
import { Redirect } from "react-router-dom";

interface Props {
  profile: any;
  userId: string;
}

const Create: React.FC<Props> = ({ profile, userId }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [img, setImg] = useState<any>(undefined);
  const [imgPreview, setImgPreview] = useState<any>(undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createOrganizer(
      { name, description, place, isAvailable },
      profile,
      userId,
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
  return (
    <div className="s-cms">
      <div className="s-cms__form-conatiner">
        <h2 className="s-cms__header">Toevoegen bestuurslid</h2>
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
            <input
              type="file"
              name="imgToUpload"
              id="imgToUplaod"
              onChange={e => handleImageUpload(e)}
            />
            <img src={imgPreview} alt="preview" />
          </div>
          <button>Plaats bestuurslid</button>
        </form>
      </div>
      {redirect ? <Redirect to="/organizer" /> : null}
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    profile: state.firebase.profile,
    userId: state.firebase.auth.uid
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    createOrganizer: (organizer: any, profile: any, userId: string, img: any) =>
      dispatch(createOrganizer(organizer, profile, userId, img))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
