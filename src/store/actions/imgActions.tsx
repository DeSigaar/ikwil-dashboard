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
