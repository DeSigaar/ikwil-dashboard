const initState = {
  authError: null
};

const authReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return { ...state, authError: action.err };
    case "LOGIN_SUCCESS":
      return { ...state, authError: null };
    case "SIGNOUT_SUCCESS":
      return state;
    case "SIGNUP_SUCCESS":
      return { ...state, authError: null };
    case "SIGNOUT_ERROR":
      return { ...state, authError: action.err.message };

    default:
      return state;
  }
};

export default authReducer;
