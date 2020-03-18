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
import config from "./config/fbConfig";
import "./config/dotEnv";
require("dotenv").config();
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
