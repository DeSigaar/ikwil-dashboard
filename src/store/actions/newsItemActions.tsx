import { store } from "../../index";
import firebase from "firebase/app";

export const createNewsItem = (
  newsItem: iNewsItem,
  profile: any,
  id: string
) => {
  firebase
    .firestore()
    .collection("news")
    .add({
      title: newsItem.title,
      text: newsItem.text,
      createdBy: profile.firstName + " " + profile.lastName,
      creatorID: id
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
  docId: string
) => {
  firebase
    .firestore()
    .collection("news")
    .doc(docId)
    .set({
      title: newsItem.title,
      text: newsItem.text,
      createdBy: profile.firstName + " " + profile.lastName,
      creatorID: id
    })
    .then(() => store.dispatch({ type: "EDIT_NEWSITEM_SUCCESS" }))
    .catch(err => store.dispatch({ type: "EDIT_NEWSITEM_ERROR", err }));
};

export const DeleteNewsItem = (docId: string) => {
  firebase
    .firestore()
    .collection("news")
    .doc(docId)
    .delete()
    .then(() => store.dispatch({ type: "DELETE_NEWSITEM_SUCCESS" }))
    .catch(err => store.dispatch({ type: "DELETE_NEWSITEM_ERROR", err }));
};
