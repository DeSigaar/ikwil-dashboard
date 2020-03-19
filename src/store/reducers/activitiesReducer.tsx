const initState = {
  activities: {
    name: ""
  }
};

const activitiesReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "CREATE_ACTIVITY_SUCCESS":
      return state;
    case "CREATE_ACTIVITY_ERROR":
      return { ...state, error: action.err };
    case "EDIT_ACTIVITY_SUCCESS":
      return state;
    case "EDIT_ACTIVITY_ERROR":
      return { ...state, error: action.err };
    case "DELETE_ACTIVITY_SUCCESS":
      return state;
    case "DELETE_ACTIVITY_ERROR":
      return { ...state, error: action.err };
    default:
      return state;
  }
};

export default activitiesReducer;
