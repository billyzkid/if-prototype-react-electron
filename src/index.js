import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore } from "redux";
import App from "./components/App";

const userReducer = function (state = {}, action) {
  switch (action.type) {
    case "CHANGE_NAME":
      return { ...state, name: action.payload };

    case "CHANGE_AGE":
      return { ...state, age: action.payload };

    default:
      return state;
  }
};

const tweetsReducer = function (state = [], action) {
  return state;
};

const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer
});

const store = createStore(reducers);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

store.dispatch({ type: "CHANGE_NAME", payload: "Will" });
store.dispatch({ type: "CHANGE_AGE", payload: 41 });
store.dispatch({ type: "CHANGE_AGE", payload: 42 });

ReactDOM.render(<App />, document.getElementById("root"));