/* Basic react stuff */
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";

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
import fbConfig from "./config/fbConfig";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { composeWithDevTools } from "redux-devtools-extension";

firebase.initializeApp(fbConfig);

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
