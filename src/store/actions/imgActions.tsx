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
  if (typeof path !== "undefined") {
    const pathRef = firebase.storage().ref(path);
    return pathRef.getDownloadURL();
  }
};
