import { store } from "../../index";
import firebase from "firebase";

interface iLogin {
  email: string;
  password: string;
}

export const signIn = (credentials: iLogin) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => store.dispatch({ type: "LOGIN_SUCCESS" }))
    .catch((err) => store.dispatch({ type: "LOGIN_ERROR", err }));
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => store.dispatch({ type: "SIGNOUT_SUCCESS" }));
};

export const addAdmin = (newUser: iNewUser) => {
  return () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp: any) => {
        setTimeout(function () {
          firebase
            .firestore()
            .collection("users")
            .doc(resp.user?.uid)
            .update({
              admin: true,
              displayName: newUser.firstName + newUser.lastName,
              initials: newUser.firstName[0] + newUser.lastName[0],
            });
        }, 5000);
      })
      .then(() => {
        store.dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        store.dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
