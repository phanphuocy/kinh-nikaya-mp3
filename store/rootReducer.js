import { combineReducers } from "redux";
import systemReducer from "./reducers/systemReducers";

const rootReducer = combineReducers({
  system: systemReducer,
});

export default rootReducer;
