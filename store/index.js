import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import devToolsEnhancer from "remote-redux-devtools";
// TODO: remove devToolsEnhancer

const initialState = {};
// const store = createStore(rootReducer);
const store = createStore(rootReducer, initialState, composeWithDevTools());

export default store;
