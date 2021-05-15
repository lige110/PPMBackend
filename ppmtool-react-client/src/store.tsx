import { createStore, applyMiddleware, compose, Store } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
const middleware = [thunk];

let store: Store;

const ReactReduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  : () => {};

if (window.navigator.userAgent.includes("Chrome") && ReactReduxDevTools) {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ReactReduxDevTools)
  );
} else {
  //   store = createStore(
  //     rootReducer,
  //     initialState,
  //     compose(applyMiddleware(...middleware))
  //   );
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}

export default store;
