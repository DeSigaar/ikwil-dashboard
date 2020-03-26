const initState = {
  meals: {
    name: "",
    meal: ""
  }
};

const MealsReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "CREATE_MEAL_SUCCESS":
      return state;
    case "CREATE_MEAL_ERROR":
      return { ...state, error: action.err };
    case "DELETE_MEAL_SUCCESS":
      return state;
    case "DELETE_MEAL_ERROR":
      return { ...state, error: action.err };
    case "EDIT_MEAL_ERROR":
      return { ...state, error: action.err };
    case "EDIT_MEAL_SUCCESS":
      return state;
    default:
      return state;
  }
};

export default MealsReducer;
