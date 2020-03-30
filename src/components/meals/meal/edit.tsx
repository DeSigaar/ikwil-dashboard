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

  useEffect(() => {
    if (typeof meal !== "undefined") {
      setName(meal.name);
      setPrice(meal.price);
      setIngredients(meal.ingredients);
      setIsHallal(meal.isHallal);
      setIsVegan(meal.isVegan);
      setisVegetarian(meal.isVegetarian);
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
      isActive: false
    };
    EditMeal(tempMeal, profile, auth.uid, link.params.id, img);
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
        <>
          <h2>Edit</h2>
          <form onSubmit={e => handleSubmit(e)}>
            <div>
              Naam
              <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              Prijs
              <input
                required
                value={price}
                type="number"
                min="1"
                step="any"
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div>
              Ingredienten
              <input
                value={ingredients}
                placeholder={"Sla, Tomaat, Ui"}
                onChange={e => setIngredients(e.target.value)}
              />
            </div>
            <div>
              Hallal
              <input
                type="checkbox"
                checked={isHallal}
                placeholder={"Sla, Tomaat, Ui"}
                onChange={e => setIsHallal(!isHallal)}
              />
            </div>
            <div>
              Vegetarisch
              <input
                type="checkbox"
                checked={isVegetarian}
                placeholder={"Sla, Tomaat, Ui"}
                onChange={e => setisVegetarian(!isVegetarian)}
              />
            </div>
            <div>
              Vegan
              <input
                type="checkbox"
                checked={isVegan}
                placeholder={"Sla, Tomaat, Ui"}
                onChange={e => setIsVegan(!isVegan)}
              />
            </div>
            <div>
              Fototje
              <input
                type="file"
                name="imgToUpload"
                id="imgToUplaod"
                onChange={e => handleImageUpload(e)}
              />
            </div>
            <img src={imgPreview} alt="preview" />
            <button>update</button>
          </form>
        </>
      );
    } else {
      return <Redirect to={"/active-meals"} />;
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
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    EditMeal: (
      meal: any,
      profile: any,
      id: string,
      docId: string,
      img: any,
      imgRef: string
    ) => dispatch(EditMeal(meal, profile, id, docId, img, imgRef)),
    GetPhoto: (path: string) => dispatch(GetPhoto(path))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "meals", doc: props.link.params.id }
  ])
)(Edit) as React.FC<Props>;
