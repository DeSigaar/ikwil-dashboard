import { store } from "../../index";
import firebase from "firebase/app";
import { uploadPhoto } from "./imgActions";

export const createOrganizer = (
  organizer: iOrganizer,
  profile: any,
  id: string,
  img: any,
  availability: any
) => {
  let imgRef = { fullPath: "images/organisers/default.png" };
  if (typeof img !== "undefined") {
    imgRef = uploadPhoto(img, "organisers/" + img.name);
  }
  const ref = firebase.firestore().collection("organisers").doc();
  ref
    .set({
      name: organizer.name,
      description: organizer.description,
      place: organizer.place,
      createdBy: profile.firstName + " " + profile.lastName,
      creatorID: id,
      id: ref.id,
      img: imgRef.fullPath,
      availability,
      __deleted: false,
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
  docId: string,
  imgPath: string,
  img?: any,
  availability?: any
) => {
  let imgRef = { fullPath: "images/organisers/default.jpg" };
  if (typeof imgPath !== "undefined") {
    imgRef.fullPath = imgPath;
  }
  if (typeof img !== "undefined") {
    imgRef = uploadPhoto(img, "organisers/" + img.name);
  }
  firebase
    .firestore()
    .collection("organisers")
    .doc(docId)
    .set({
      name: organizer.name,
      description: organizer.description,
      place: organizer.place,
      createdBy: profile.firstName + " " + profile.lastName,
      creatorID: id,
      img: imgRef.fullPath,
      availability,
      __deleted: false,
    })
    .then(() => store.dispatch({ type: "EDIT_ORGANIZER_SUCCESS" }))
    .catch((err) => store.dispatch({ type: "EDIT_ORGANIZER_ERROR", err }));
};

export const DeleteOrganizer = (docId: string) => {
  firebase
    .firestore()
    .collection("organisers")
    .doc(docId)
    .delete()
    .then(() => store.dispatch({ type: "DELETE_ORGANIZER_SUCCESS" }))
    .catch((err) => store.dispatch({ type: "DELETE_ORGANIZER_ERROR", err }));
};
