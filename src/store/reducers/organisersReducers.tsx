const initState = {
  organisers: {
    name: "",
    description: "",
    place: "",
    isAvailable: true
  }
};

const organisersReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "CREATE_ORGANIZER_SUCCESS":
      return state;
    case "CREATE_ORGANIZER_ERROR":
      return { ...state, error: action.err };
    case "DELETE_ORGANIZER_SUCCESS":
      return state;
    case "DELETE_ORGANIZER_ERROR":
      return { ...state, error: action.err };
    case "EDIT_ORGANIZER_ERROR":
      return { ...state, error: action.err };
    case "EDIT_ORGANIZER_SUCCESS":
      return state;
    default:
      return state;
  }
};

export default organisersReducer;
