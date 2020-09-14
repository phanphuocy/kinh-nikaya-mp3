import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import devToolsEnhancer from "remote-redux-devtools";
// TODO: remove devToolsEnhancer

const initialState = {};

const middlewares = [thunk];
// const store = createStore(rootReducer);
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
