import React, { useState } from "react";
import { connect } from "react-redux";
import { createMeal } from "../../../store/actions/mealActions";
import { Redirect } from "react-router-dom";

interface Props {
  profile: any;
  userId: string;
}

const Create: React.FC<Props> = ({ profile, userId }) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [isHallal, setIsHallal] = useState<boolean>(false);
  const [isVegan, setIsVegan] = useState<boolean>(false);
  const [isVegetarian, setisVegetarian] = useState<boolean>(false);

  const [redirect, setRedirect] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMeal(
      { name, price, ingredients, isHallal, isVegan, isVegetarian },
      profile,
      userId
    );
    setRedirect(true);
  };
  return (
    <div className="s-cms">
      <div className="s-cms__form-conatiner">
        <h2 className="s-cms__header">Toevoegen</h2>
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
          <button>Maaltijd toevoegen</button>
        </form>
      </div>
      {redirect ? <Redirect to="/admin/meals" /> : null}
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
    createMeal: (meal: any, profile: any, userId: string) =>
      dispatch(createMeal(meal, profile, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
