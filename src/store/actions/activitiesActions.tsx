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
      store.dispatch({ type: "CREATE_ACTIVITY_SUCCESS", activity });
    })
    .catch((err: any) => {
      store.dispatch({ type: "CREATE_ACTIVITY_ERROR", err });
      console.error("err", err);
    });

  return store.dispatch({ type: "CREATE_ACTIVITY_SUCCESS", activity });
};

export const EditActivity = (
  activity: any,
  profile: any,
  id: string,
  docId: string
) => {
  firebase
    .firestore()
    .collection("activities")
    .doc(docId)
    .set({
      name: activity.name,
      createdBy: profile.firstName + " " + profile.lastName,
      creatorID: id
    })
    .then(() => store.dispatch({ type: "EDIT_ACTIVITY_SUCCESS" }))
    .catch(err => store.dispatch({ type: "EDIT_ACTIVITY_ERROR", err }));
};

export const DeleteActivity = (docId: string) => {
  firebase
    .firestore()
    .collection("activities")
    .doc(docId)
    .delete()
    .then(() => store.dispatch({ type: "DELETE_ACTIVITY_SUCCESS" }))
    .catch(err => store.dispatch({ type: "DELETE_ACTIVITY_ERROR", err }));
};
