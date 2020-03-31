import { store } from "../../index";
import firebase from "firebase/app";

export const uploadPhoto = (img: any, path: string) => {
  const imgRef = firebase
    .storage()
    .ref()
    .child("images/" + path);

  imgRef.put(img).then(function(snapshot: any) {
    store.dispatch({ type: "UPLOAD_IMAGE_SUCCESS", img });
  });
  return imgRef;
};

export const GetPhoto = (path: string | undefined) => {
  let imglink =
    "https://firebasestorage.googleapis.com/v0/b/stichting-ik-wil.appspot.com/o/images%2Fmeals%2Fdefault.png?alt=media&token=5886c40a-8030-4d7a-b644-c80acb185837";
  if (typeof path !== "undefined") {
    const pathRef = firebase.storage().ref(path);
    return pathRef.getDownloadURL();
  }
};
