const initState = {
  rules: {
    name: "",
    rule: ""
  }
};

const rulesReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "CREATE_RULE_SUCCESS":
      return state;
    case "CREATE_RULE_ERROR":
      return { ...state, error: action.err };
    case "DELETE_RULE_SUCCESS":
      return state;
    case "DELETE_RULE_ERROR":
      return { ...state, error: action.err };
    case "EDIT_RULE_ERROR":
      return { ...state, error: action.err };
    case "EDIT_RULE_SUCCESS":
      return state;
    default:
      return state;
  }
};

export default rulesReducer;
