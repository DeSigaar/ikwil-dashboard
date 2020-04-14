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
  const [redirect, setRedirect] = useState<boolean>(false);
  const [img, setImg] = useState<any>(undefined);
  const [imgPreview, setImgPreview] = useState<any>(undefined);

  const [monday, setMonday] = useState<boolean>(false);
  const [tuesday, setTuesday] = useState<boolean>(false);
  const [wednesday, setWednesday] = useState<boolean>(false);
  const [thursday, setThursday] = useState<boolean>(false);
  const [friday, setFriday] = useState<boolean>(false);
  const [saturday, setSaturday] = useState<boolean>(false);
  const [sunday, setSunday] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let availability = {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    };
    createOrganizer(
      { name, description, place },
      profile,
      userId,
      img,
      availability
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
        <h2 className="s-cms__header">Coördinator toevoegen</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="o-inputfield">
            <label>Naam</label>
            <input
              className="o-inputfield__input"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="o-inputfield">
            <label>Beschrijving van je werkzaamheden</label>
            <input
              className="o-inputfield__input"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="o-inputfield">
            <label>Plaats waar je het meeste bent</label>
            <input
              className="o-inputfield__input"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>

          <div>
            <label className="checkbox-container">
              <label className="o-inputfield__sublabel">Maandag</label>
              <input onChange={(e) => setMonday(!monday)} type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
          <div>
            <label className="checkbox-container">
              <label className="o-inputfield__sublabel">Dinsdag</label>
              <input onChange={(e) => setTuesday(!tuesday)} type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
          <div>
            <label className="checkbox-container">
              <label className="o-inputfield__sublabel">Woensdag</label>
              <input
                onChange={(e) => setWednesday(!wednesday)}
                type="checkbox"
              />
              <span className="checkmark"></span>
            </label>
          </div>
          <div>
            <label className="checkbox-container">
              <label className="o-inputfield__sublabel">Donderdag</label>
              <input onChange={(e) => setThursday(!thursday)} type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
          <div>
            <label className="checkbox-container">
              <label className="o-inputfield__sublabel">Vrijdag</label>
              <input onChange={(e) => setFriday(!friday)} type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
          <div>
            <label className="checkbox-container">
              <label className="o-inputfield__sublabel">Zaterdag</label>
              <input onChange={(e) => setSaturday(!saturday)} type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
          <div>
            <label className="checkbox-container">
              <label className="o-inputfield__sublabel">Zondag</label>
              <input onChange={(e) => setSunday(!sunday)} type="checkbox" />
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
              onChange={(e) => handleImageUpload(e)}
            />
          </div>
          <button>Coördinator aanmaken</button>
        </form>
      </div>
      {redirect ? <Redirect to="/admin/organisers" /> : null}
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    profile: state.firebase.profile,
    userId: state.firebase.auth.uid,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    createOrganizer: (
      organizer: any,
      profile: any,
      userId: string,
      img: any,
      availability: any
    ) =>
      dispatch(createOrganizer(organizer, profile, userId, img, availability)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
