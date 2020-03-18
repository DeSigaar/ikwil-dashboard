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
    .catch(err => store.dispatch({ type: "LOGIN_ERROR", err }));
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => store.dispatch({ type: "SIGNOUT_SUCCESS" }));
};
