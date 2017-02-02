// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./components/App";

// ReactDOM.render(<App />, document.getElementById("root"));

import { createStore } from "redux";

const reducer = function (state, action) {
  switch (action.type) {
    case "INC":
      return state + action.payload;
    case "DEC":
      return state - action.payload;
    default:
      return state;
  }
};

const store = createStore(reducer, 0);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

store.dispatch({ type: "INC", payload: 1 });
store.dispatch({ type: "INC", payload: 2 });
store.dispatch({ type: "INC", payload: 22 });
store.dispatch({ type: "INC", payload: 1 });
store.dispatch({ type: "DEC", payload: 1000 });