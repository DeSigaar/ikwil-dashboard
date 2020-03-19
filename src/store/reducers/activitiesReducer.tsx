const initState = {
  activities: {
    name: "oye"
  }
};

const activitiesReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "CREATE_ACTIVITY_SUCCESS":
      return state;
    case "CREATE_ACTIVITY_ERROR":
      return action.err;
    case "EDIT_ACTIVITY_SUCCESS":
      return state;
    default:
      return state;
  }
};

export default activitiesReducer;
