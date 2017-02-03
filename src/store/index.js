import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import * as middlewares from "./reducers";
import * as reducers from "./reducers";



const reducer = combineReducers(reducers);
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