import { applyMiddleware, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise";
import reducer from "./reducer";

const enhancers = [
  applyMiddleware(
    thunkMiddleware,
    promiseMiddleware,
    // createLogger({
    //   collapsed: false,
    //   // eslint-disable-next-line no-undef
    //   predicate: () => __DEV__,
    // }),
  ),
];

/* eslint-disable no-undef */
const composeEnhancers =
  (__DEV__ &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

const persistConfig = {
  key: 'root24',
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);
// export const store = createStore(persistedReducer, {}, enhancer);
export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
