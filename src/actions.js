import { actionTypes } from "./constants";

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