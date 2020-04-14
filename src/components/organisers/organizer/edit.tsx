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

  const [redirect, setRedirect] = useState<boolean>(false);
  const [img, setImg] = useState<any>(undefined);
  const [imgPreview, setImgPreview] = useState<any>(undefined);
  const [imgRef, setImgRef] = useState<string>("");

  const [monday, setMonday] = useState<boolean>(false);
  const [tuesday, setTuesday] = useState<boolean>(false);
  const [wednesday, setWednesday] = useState<boolean>(false);
  const [thursday, setThursday] = useState<boolean>(false);
  const [friday, setFriday] = useState<boolean>(false);
  const [saturday, setSaturday] = useState<boolean>(false);
  const [sunday, setSunday] = useState<boolean>(false);

  useEffect(() => {
    if (typeof organizer !== "undefined") {
      setName(organizer.name);
      setDescription(organizer.description);
      if (typeof organizer.place !== "undefined") {
        setPlace(organizer.place);
      }

      if (typeof organizer.img !== "undefined") {
        setImgRef(organizer.img);
      }
      GetPhoto(organizer.img)?.then((res: any) => {
        setImgPreview(res);
      });
      if (typeof organizer.availability !== "undefined") {
        setMonday(organizer.availability.monday);
        setTuesday(organizer.availability.tuesday);
        setWednesday(organizer.availability.wednesday);
        setThursday(organizer.availability.thursday);
        setFriday(organizer.availability.friday);
        setSaturday(organizer.availability.saturday);
        setSunday(organizer.availability.sunday);
      }
    }
  }, [organizer]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let availability = {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday
    };
    EditOrganizer(
      { name, description, place },
      profile,
      auth.uid,
      link.params.id,
      imgRef,
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
                <label>Beschikbaarheid</label>
                <label className="checkbox-container">
                  <label className="o-inputfield__sublabel">Maandag</label>
                  <input
                    checked={monday}
                    onChange={e => setMonday(!monday)}
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkbox-container">
                  <label className="o-inputfield__sublabel">Dinsdag</label>
                  <input
                    checked={tuesday}
                    onChange={e => setTuesday(!tuesday)}
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkbox-container">
                  <label className="o-inputfield__sublabel">Woensdag</label>
                  <input
                    checked={wednesday}
                    onChange={e => setWednesday(!wednesday)}
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkbox-container">
                  <label className="o-inputfield__sublabel">Donderdag</label>
                  <input
                    checked={thursday}
                    onChange={e => setThursday(!thursday)}
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkbox-container">
                  <label className="o-inputfield__sublabel">Vrijdag</label>
                  <input
                    checked={friday}
                    onChange={e => setFriday(!friday)}
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkbox-container">
                  <label className="o-inputfield__sublabel">Zaterdag</label>
                  <input
                    checked={saturday}
                    onChange={e => setSaturday(!saturday)}
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="checkbox-container">
                  <label className="o-inputfield__sublabel">Zondag</label>
                  <input
                    checked={sunday}
                    onChange={e => setSunday(!sunday)}
                    type="checkbox"
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
              <button>Update coördinator</button>
            </form>
          </div>
        </div>
      );
    } else {
      return <Redirect to={"/admin/organisers/"} />;
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
      img?: any,
      availability?: any
    ) =>
      dispatch(
        EditOrganizer(organizer, profile, id, docId, imgPath, img, availability)
      ),
    GetPhoto: (path: string) => dispatch(GetPhoto(path))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "organisers", doc: props.link.params.id }
  ])
)(Edit) as React.FC<Props>;
