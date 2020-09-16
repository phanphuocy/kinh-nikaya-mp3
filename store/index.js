import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import { parse, stringify } from "flatted";

import devToolsEnhancer from "remote-redux-devtools";
// TODO: remove devToolsEnhancer
// Middleware: Redux Persist Config
const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState)
);

const persistConfig = {
  // Root
  key: "root",
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ["personal"],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: ["system"],
  transforms: [transformCircular],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

const middlewares = [thunk];
// const store = createStore(rootReducer);
const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export { store, persistor };
