import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./components/App";

const initialDataState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
};

const dataReducer = function (state = initialDataState, action) {
  switch (action.type) {
    case "FETCH_DATA_START":
      return { ...state, fetching: true };

    case "FETCH_DATA_COMPLETE":
      return { ...state, fetching: false, fetched: true, users: action.payload };

    case "FETCH_DATA_ERROR":
      return { ...state, fetching: false, error: action.payload };

    default:
      return state;
  }
};

const userReducer = function (state = {}, action) {
  switch (action.type) {
    case "CHANGE_USER_NAME":
      return { ...state, name: action.payload };

    case "CHANGE_USER_AGE":
      return { ...state, age: action.payload };

    default:
      return state;
  }
};

const tweetsReducer = function (state = [], action) {
  switch (action.type) {
    case "SEND_TWEET":
      throw new Error("ARGH!!!!!!!")

    default:
      return state;
  }
};

const reducers = combineReducers({
  data: dataReducer,
  user: userReducer,
  tweets: tweetsReducer
});

const loggerMiddleware = (store) => (next) => (action) => {
  console.log("action fired", action);
  next(action);
};

const errorMiddleware = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (x) {
    console.log("error occurred", x.message);
  }
};

const middleware = applyMiddleware(thunk, loggerMiddleware, errorMiddleware);
const store = createStore(reducers, middleware);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

// asynchronous dispatching (requires custom middleware, e.g. thunk)
store.dispatch((dispatch) => {
  dispatch({ type: "FETCH_DATA_START" });

  new Promise((resolve, reject) => {
    setTimeout(resolve, 2000);
  }).then(() => {
    return { fake: true };
  }).then((data) => {
    dispatch({ type: "FETCH_DATA_COMPLETE", payload: data });
  }).catch((error) => {
    dispatch({ type: "FETCH_DATA_ERROR", payload: error });
  });
});

// synchronous dispatching (works out-of-the-box)
store.dispatch({ type: "CHANGE_USER_NAME", payload: "Will" });
store.dispatch({ type: "CHANGE_USER_AGE", payload: 41 });
store.dispatch({ type: "CHANGE_USER_AGE", payload: 42 });
store.dispatch({ type: "SEND_TWEET", payload: 42 });

ReactDOM.render(<App />, document.getElementById("root"));