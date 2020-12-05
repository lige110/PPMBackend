import { createStore, applyMiddleware, compose, Store } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
const middleware = [thunk];

let store: Store;

if (window.navigator.userAgent.includes("Chrome")) {
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
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
