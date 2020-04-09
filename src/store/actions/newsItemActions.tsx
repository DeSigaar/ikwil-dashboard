import { store } from "../../index";
import firebase from "firebase/app";
import { uploadPhoto } from "./imgActions";

export const createNewsItem = (
  newsItem: iNewsItem,
  profile: any,
  id: string,
  img: any
) => {
  let imgRef = { fullPath: "images/news/default.png" };
  if (typeof img !== "undefined") {
    imgRef = uploadPhoto(img, "news/" + img.name);
  }
  const ref = firebase.firestore().collection("news").doc();
  ref
    .set({
      title: newsItem.title,
      text: newsItem.text,
      createdBy: profile.displayName,
      creatorID: id,
      id: ref.id,
      img: imgRef.fullPath,
      __deleted: false,
    })
    .then(() => {
      store.dispatch({ type: "CREATE_NEWSITEM_SUCCESS", newsItem });
    })
    .catch((err: any) => {
      store.dispatch({ type: "CREATE_NEWSITEM_ERROR", err });
      console.error("err", err);
    });

  return store.dispatch({ type: "CREATE_NEWSITEM_SUCCESS", newsItem });
};

export const EditNewsItem = (
  newsItem: any,
  profile: any,
  id: string,
  docId: string,
  imgPath: string,
  img?: any
) => {
  let imgRef = { fullPath: "images/news/default.png" };
  if (typeof imgPath !== "undefined") {
    imgRef.fullPath = imgPath;
  }
  if (typeof img !== "undefined") {
    imgRef = uploadPhoto(img, "news/" + img.name);
  }
  firebase
    .firestore()
    .collection("news")
    .doc(docId)
    .set({
      __deleted: false,
      title: newsItem.title,
      text: newsItem.text,
      createdBy: profile.displayName,
      creatorID: id,
      img: imgRef.fullPath,
    })
    .then(() => store.dispatch({ type: "EDIT_NEWSITEM_SUCCESS" }))
    .catch((err) => store.dispatch({ type: "EDIT_NEWSITEM_ERROR", err }));
};

export const DeleteNewsItem = (docId: string) => {
  firebase
    .firestore()
    .collection("news")
    .doc(docId)
    .delete()
    .then(() => store.dispatch({ type: "DELETE_NEWSITEM_SUCCESS" }))
    .catch((err) => store.dispatch({ type: "DELETE_NEWSITEM_ERROR", err }));
};
