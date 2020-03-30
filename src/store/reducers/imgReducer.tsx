const initState = {
  img:
    "https://firebasestorage.googleapis.com/v0/b/stichting-ik-wil.appspot.com/o/images%2Fmeals%2Fdefault.png?alt=media&token=5886c40a-8030-4d7a-b644-c80acb185837"
};

const imgReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "UPLOAD_IMAGE_SUCCESS":
      return state;
    default:
      return state;
  }
};

export default imgReducer;
