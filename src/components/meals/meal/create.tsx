import React, { useState } from "react";
import { connect } from "react-redux";
import { createMeal } from "../../../store/actions/mealActions";

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMeal(
      { name, price, ingredients, isHallal, isVegan, isVegetarian },
      profile,
      userId
    );
  };
  return (
    <div>
      <h2>Toevoegen</h2>
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
        <button>submit</button>
      </form>
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
