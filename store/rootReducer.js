import { combineReducers } from "redux";
import systemReducer from "./reducers/systemReducers";
import playerReducer from "./reducers/playerReducer";

const rootReducer = combineReducers({
  system: systemReducer,
  player: playerReducer,
});

export default rootReducer;
