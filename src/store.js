import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import * as actionCreators from "./actions";
import * as reducers from "./reducers";

const reducer = combineReducers(reducers);

const initialState = {
  data: {
    fetching: false,
    fetched: false,
    data: null,
    error: null
  },
  user: {
    name: "Will",
    age: 41
  },
  tweets: ["#TrumpSucks"]
};

const errorHandler = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (x) {
    console.log("error occurred", x.message);
  }
};

let store;

if (process.env.NODE_ENV !== "production") {
  const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators }) : compose;
  const enhancer = composeEnhancers(applyMiddleware(thunk, errorHandler, createLogger({ collapsed: true })));
  store = createStore(reducer, initialState, enhancer);
} else {
  const enhancer = compose(applyMiddleware(thunk, errorHandler));
  store = createStore(reducer, initialState, enhancer);
}

export default store;