import { actionTypes } from "./constants";
import { delay } from "./utilities";

export function fetchData() {
  return (dispatch) => {
    dispatch(fetchDataPending());
    delay(2000).then(() => {
      dispatch(fetchDataFulfilled([
        { name: "Bob", age: 40 },
        { name: "Sue", age: 35 }
      ]));
    }).catch((error) => {
      dispatch(fetchDataRejected(error));
    });
  };
}

export function fetchDataPending() {
  return { type: actionTypes.fetchDataPending };
}

export function fetchDataFulfilled(data) {
  return { type: actionTypes.fetchDataFulfilled, data };
}

export function fetchDataRejected(error) {
  return { type: actionTypes.fetchDataRejected, error };
}

export function changeUserName(name) {
  return { type: actionTypes.changeUserName, name };
}

export function changeUserAge(age) {
  return { type: actionTypes.changeUserAge, age };
}

export function sendTweet(text) {
  return { type: actionTypes.sendTweet, text };
}