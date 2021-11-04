import { createStore, applyMiddleware, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducer/configure.reducer";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

const configureStore = () => {
  const store = createStoreWithMiddleware(rootReducer);
  return store;
};

const wrapper = createWrapper(configureStore, { debug: true });

export default wrapper;
