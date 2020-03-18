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
export const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
