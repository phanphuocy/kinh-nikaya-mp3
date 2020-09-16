import { combineReducers } from "redux";
import systemReducer from "./reducers/systemReducers";
import playerReducer from "./reducers/playerReducer";
import personalReducer from "./reducers/personalReducer";

const rootReducer = combineReducers({
  system: systemReducer,
  player: playerReducer,
  personal: personalReducer,
});

export default rootReducer;
