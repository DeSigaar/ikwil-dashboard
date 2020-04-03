import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { EditMeal } from "../../../store/actions/mealActions";
import { Redirect } from "react-router-dom";
import { GetPhoto } from "../../../store/actions/imgActions";

interface Props {
  link?: any;
  profile?: any;
  meal?: iMeal;
  auth?: any;
}

const Edit: React.FC<Props> = ({ meal, auth, profile, link }) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [isHallal, setIsHallal] = useState<boolean>(false);
  const [isVegan, setIsVegan] = useState<boolean>(false);
  const [isVegetarian, setisVegetarian] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [img, setImg] = useState<any>(undefined);
  const [imgPreview, setImgPreview] = useState<any>(undefined);
  const [imgRef, setImgRef] = useState<string>("");

  useEffect(() => {
    if (typeof meal !== "undefined") {
      setName(meal.name);
      setPrice(meal.price);
      setIngredients(meal.ingredients);
      setIsHallal(meal.isHallal);
      setIsVegan(meal.isVegan);
      setisVegetarian(meal.isVegetarian);
      if (typeof meal.img !== "undefined") {
        setImgRef(meal.img);
      }
      GetPhoto(meal.img)?.then((res: any) => {
        setImgPreview(res);
      });
    }
  }, [meal]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let tempMeal = {
      name,
      price,
      ingredients,
      isHallal,
      isVegan,
      isVegetarian,
      isActive: true,
      img: imgRef
    };
    EditMeal(tempMeal, profile, auth.uid, link.params.id, imgRef, img);
    setRedirect(true);
  };

  const handleImageUpload = (e: any) => {
    e.preventDefault();
    if (typeof e.target.files[0] !== "undefined") {
      setImgPreview(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    }
  };
  if (typeof meal !== "undefined") {
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
                <label>Prijs</label>
                <input
                  className="o-inputfield__input"
                  required
                  value={price}
                  type="number"
                  min="1"
                  step="any"
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
              <div className="o-inputfield">
                <label>Ingredienten</label>
                <input
                  className="o-inputfield__input"
                  value={ingredients}
                  placeholder={"Sla, Tomaat, Ui"}
                  onChange={e => setIngredients(e.target.value)}
                />
              </div>
              <div className="o-inputfield">
                <label className="checkbox-container">
                  <label className="o-inputfield__sublabel">Hallal</label>
                  <input
                    type="checkbox"
                    checked={isHallal}
                    onChange={e => setIsHallal(!isHallal)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="o-inputfield">
                <label className="checkbox-container">
                  <label className="o-inputfield__sublabel">Vegetarisch</label>
                  <input
                    type="checkbox"
                    checked={isVegetarian}
                    onChange={e => setisVegetarian(!isVegetarian)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="o-inputfield">
                <label className="checkbox-container">
                  <label className="o-inputfield__sublabel">Vegan</label>
                  <input
                    type="checkbox"
                    checked={isVegan}
                    onChange={e => setIsVegan(!isVegan)}
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
              <button>Update Maaltijd</button>
            </form>
          </div>
        </div>
      );
    } else {
      return <Redirect to={"/admin/meals"} />;
    }
  } else {
    return <>Error</>;
  }
};
const mapStateToProps = (state: any) => {
  if (typeof state.firestore.ordered.meals !== "undefined") {
    return {
      meal: state.firestore.ordered.meals[0],
      profile: state.firebase.profile,
      auth: state.firebase.auth
    };
  } else {
    return {};
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    EditMeal: (
      meal: any,
      profile: any,
      id: string,
      docId: string,
      imgRef: string,
      img: any
    ) => dispatch(EditMeal(meal, profile, id, docId, imgRef, img)),
    GetPhoto: (path: string) => dispatch(GetPhoto(path))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "meals", doc: props.link.params.id }
  ])
)(Edit) as React.FC<Props>;
