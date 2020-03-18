import authReducer from "./authReducer";
import activitiesReducer from "./activitiesReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  activities: activitiesReducer
});

export default rootReducer;
