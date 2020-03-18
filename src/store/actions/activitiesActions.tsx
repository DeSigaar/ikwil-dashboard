import { store } from "../../index";

export const createActivity = (activity: any) => {
  return store.dispatch({ type: "CREATE_ACTIVITY", activity });
};
