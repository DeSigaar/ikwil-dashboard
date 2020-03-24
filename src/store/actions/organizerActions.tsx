import { store } from "../../index";
import firebase from "firebase/app";

export const createOrganizer = (
  organizer: iOrganizer,
  profile: any,
  id: string
) => {
  const ref = firebase
  .firestore().collection('organisers').doc();
  ref
    .set({
      name: organizer.name,
      isAvailable: organizer.isAvailable,
      createdBy: profile.firstName + " " + profile.lastName,
      creatorID: id,
      id: ref.id
    })
    .then(() => {
      store.dispatch({ type: "CREATE_ORGANISERS_SUCCESS", organizer });
    })
    .catch((err: any) => {
      store.dispatch({ type: "CREATE_ORGANISERS_ERROR", err });
      console.error("err", err);
    });

  return store.dispatch({ type: "CREATE_ORGANISERS_SUCCESS", organizer });
};

export const EditOrganizer = (
  organizer: any,
  profile: any,
  id: string,
  docId: string
) => {
  firebase
    .firestore()
    .collection("organisers")
    .doc(docId)
    .set({
      name: organizer.name,
      isAvailable: organizer.isAvailable,
      createdBy: profile.firstName + " " + profile.lastName,
      creatorID: id
    })
    .then(() => store.dispatch({ type: "EDIT_ORGANIZER_SUCCESS" }))
    .catch(err => store.dispatch({ type: "EDIT_ORGANIZER_ERROR", err }));
};

export const DeleteOrganizer = (docId: string) => {
  firebase
    .firestore()
    .collection("organisers")
    .doc(docId)
    .delete()
    .then(() => store.dispatch({ type: "DELETE_ORGANIZER_SUCCESS" }))
    .catch(err => store.dispatch({ type: "DELETE_ORGANIZER_ERROR", err }));
};
