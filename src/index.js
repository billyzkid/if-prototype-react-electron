import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { fetchDataPending, fetchDataFulfilled, fetchDataRejected, changeUserName, changeUserAge, sendTweet } from "./actions";
import { delay } from "./utilities";
import store from "./store";
import App from "./components/App";

// synchronous action dispatching
store.dispatch(changeUserName("Will"));
store.dispatch(changeUserAge(41));
store.dispatch(changeUserAge(42));
store.dispatch(sendTweet("#TrumpSucks"));

// asynchronous action dispatching (requires redux-thunk middleware)
store.dispatch((dispatch) => {
  dispatch(fetchDataPending());
  
  // simulate async request/response
  delay(2000).then(() => {
    dispatch(fetchDataFulfilled([
      { name: "Bob", age: 40 },
      { name: "Sue", age: 35 }
    ]));
  }).catch((error) => {
    dispatch(fetchDataRejected(error));
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"));