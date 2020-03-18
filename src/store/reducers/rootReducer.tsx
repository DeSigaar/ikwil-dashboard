import authReducer from "./authReducer";
import activitiesReducer from "./activitiesReducer";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
const rootReducer = combineReducers({
  auth: authReducer,
  activities: activitiesReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;
