import { store } from "../../index";
import firebase from "firebase/app";
import "firebase/firestore";

export const createActivity = (activity: any) => {
  firebase
    .firestore()
    .collection("activities")
    .add({ name: activity })
    .then(() => {
      store.dispatch({ type: "CREATE_ACTIVITY", activity });
    })
    .catch((err: any) => {
      store.dispatch({ type: "CREATE_ACTIVITY_ERROR", err });
      console.error("err", err);
    });

  return store.dispatch({ type: "CREATE_ACTIVITY", activity });
};

/*


*/
