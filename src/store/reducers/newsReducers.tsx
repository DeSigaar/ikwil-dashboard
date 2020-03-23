const initState = {
  news: {
    title: "",
    text: ""
  }
};

const newsReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "CREATE_NEWSITEM_SUCCESS":
      return state;
    case "CREATE_NEWSITEM_ERROR":
      return { ...state, error: action.err };
    case "DELETE_NEWSITEM_SUCCESS":
      return state;
    case "DELETE_NEWSITEM_ERROR":
      return { ...state, error: action.err };
    case "EDIT_NEWSITEM_ERROR":
      return { ...state, error: action.err };
    case "EDIT_NEWSITEM_SUCCESS":
      return state;
    default:
      return state;
  }
};

export default newsReducer;
