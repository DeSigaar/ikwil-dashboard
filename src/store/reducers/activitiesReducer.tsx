const initState = {
  activities: {
    name: "oye"
  }
};

const activitiesReducer = (state = initState, action: any) => {
  console.log("action :", action);
  switch (action.type) {
    case "CREATE_ACTIVITY":
      console.log("action", action);
      break;
  }
  return state;
};

export default activitiesReducer;
