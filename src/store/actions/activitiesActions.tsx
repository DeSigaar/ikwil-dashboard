import { store } from "../../index";
import firebase from "firebase/app";

export const createActivity = (activity: any, profile: any, id: string) => {
  firebase
    .firestore()
    .collection("activities")
    .add({
      name: activity,
      createdBy: profile.firstName + " " + profile.lastName,
      creatorID: id
    })
    .then(() => {
      store.dispatch({ type: "CREATE_ACTIVITY", activity });
    })
    .catch((err: any) => {
      store.dispatch({ type: "CREATE_ACTIVITY_ERROR", err });
      console.error("err", err);
    });

  return store.dispatch({ type: "CREATE_ACTIVITY", activity });
};
