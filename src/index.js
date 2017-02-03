import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import App from "./components/App";

function noop() { };

function delay(time) {
  return new Promise((resolve, reject) => {
    if (time !== undefined) {
      setTimeout(resolve, time);
    } else {
      setImmediate(resolve);
    }
  });
}

const initialDataState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
};

const dataReducer = function (state = initialDataState, action) {
  switch (action.type) {
    case "FETCH_DATA_PENDING":
      return { ...state, fetching: true };

    case "FETCH_DATA_FULFILLED":
      return { ...state, fetching: false, fetched: true, users: action.payload };

    case "FETCH_DATA_REJECTED":
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
      throw new Error("Argh!")

    default:
      return state;
  }
};

const thunkMiddleware = thunk;
const promiseMiddleware = promise();

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

const reducer = combineReducers({ data: dataReducer, user: userReducer, tweets: tweetsReducer });
const enhancer = applyMiddleware(thunkMiddleware, promiseMiddleware, loggerMiddleware, errorMiddleware);
const store = createStore(reducer, enhancer);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

// synchronous action dispatching (works out-of-the-box)
store.dispatch({ type: "CHANGE_USER_NAME", payload: "Will" });
store.dispatch({ type: "CHANGE_USER_AGE", payload: 41 });
store.dispatch({ type: "CHANGE_USER_AGE", payload: 42 });
store.dispatch({ type: "SEND_TWEET", payload: 42 });

// asynchronous action dispatching option #1 - requires redux-thunk
store.dispatch((dispatch) => {
  dispatch({ type: "FETCH_DATA_PENDING" });
  delay(2000).then(() => {
    return [
      { name: "Bob", age: 40 },
      { name: "Sue", age: 35 }
    ];
  }).then((data) => {
    dispatch({ type: "FETCH_DATA_FULFILLED", payload: data });
  }).catch((error) => {
    dispatch({ type: "FETCH_DATA_REJECTED", payload: error, error: true });
  });
});

// asynchronous action dispatching option #2 - requires redux-promise-middleware
store.dispatch((dispatch) => {
  dispatch({
    type: "FETCH_DATA",
    payload: delay(2000).then(() => {
      return [
        { name: "Bob", age: 40 },
        { name: "Sue", age: 35 }
      ];
    })
  }).catch(noop);
});

ReactDOM.render(<App />, document.getElementById("root"));