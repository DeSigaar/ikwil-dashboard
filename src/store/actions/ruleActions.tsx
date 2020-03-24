import { store } from "../../index";
import firebase from "firebase/app";

export const createRule = (
  rule: iRule,
  profile: any,
  id: string
) => {
  firebase
    .firestore()
    .collection("rules")
    .add({
      name: rule.name,
      rule: rule.rule,
      createdBy: profile.firstName + " " + profile.lastName,
      creatorID: id
    })
    .then(() => {
      store.dispatch({ type: "CREATE_RULE_SUCCESS", rule });
    })
    .catch((err: any) => {
      store.dispatch({ type: "CREATE_RULE_ERROR", err });
      console.error("err", err);
    });

  return store.dispatch({ type: "CREATE_RULE_SUCCESS", rule });
};

export const EditRule = (
  rule: any,
  profile: any,
  id: string,
  docId: string
) => {
  firebase
    .firestore()
    .collection("rules")
    .doc(docId)
    .set({
      name: rule.name,
      rule: rule.rule,
      createdBy: profile.firstName + " " + profile.lastName,
      creatorID: id
    })
    .then(() => store.dispatch({ type: "EDIT_RULE_SUCCESS" }))
    .catch(err => store.dispatch({ type: "EDIT_RULE_ERROR", err }));
};

export const DeleteRule = (docId: string) => {
  firebase
    .firestore()
    .collection("rules")
    .doc(docId)
    .delete()
    .then(() => store.dispatch({ type: "DELETE_RULE_SUCCESS" }))
    .catch(err => store.dispatch({ type: "DELETE_RULE_ERROR", err }));
};
