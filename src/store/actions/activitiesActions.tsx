import { store } from "../../index";
import firebase from "firebase/app";

export const createActivity = (
  activity: iActivity,
  profile: any,
  id: string,

) => {
  firebase
    .firestore()
    .collection("activities")
    .add({
      name: activity.name,
      startTime: activity.startTime, 
      endTime: activity.endTime,
      room: activity.room,
      category: "categories/" + activity.category,
      organisers: activity.organisers,
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
  activity: iActivity,
  profile: any,
  id: string,
  docId: string,
) => {
  firebase
    .firestore()
    .collection("activities")
    .doc(docId)
    .set({
      name: activity.name,
      startTime: activity.startTime,
      endTime: activity.endTime,
      organisers: activity.organisers,
      category: "categories/" + activity.category,
      room: activity.room,
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
