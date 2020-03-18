const initState = {
  activities: {
    name: "oye"
  }
};

const activitiesReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "CREATE_ACTIVITY":
      return state;
    case "CREATE_ACTIVITY_ERROR":
      return action.err;
    default:
      return state;
  }
};

export default activitiesReducer;
