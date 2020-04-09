/* Basic react stuff */
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import "./scss/index.scss";

/* Router stuff */
import { BrowserRouter as Router } from "react-router-dom";

/* Redux stuff */
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { composeWithDevTools } from "redux-devtools-extension";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_firebase_apiKey,
  appId: process.env.REACT_APP_firebase_appId,
  authDomain: process.env.REACT_APP_firebase_authDomain,
  databaseURL: process.env.REACT_APP_firebase_databaseURL,
  measurementId: process.env.REACT_APP_firebase_measurementId,
  messagingSenderId: process.env.REACT_APP_firebase_messagingSenderId,
  projectId: process.env.REACT_APP_firebase_projectId,
  storageBucket: process.env.REACT_APP_firebase_storageBucket,
});

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);
