import { actionTypes } from "./constants";

const initialDataState = {
  fetching: false,
  fetched: false,
  data: null,
  error: null
};

export function data(state = initialDataState, action) {
  switch (action.type) {
    case actionTypes.fetchDataPending:
      return { ...state, fetching: true };

    case actionTypes.fetchDataFulfilled:
      return { ...state, fetching: false, fetched: true, data: action.data };

    case actionTypes.fetchDataRejected:
      return { ...state, fetching: false, error: action.error };

    default:
      return state;
  }
}

const initialUserState = {
  name: null,
  age: null
};

export function user(state = initialUserState, action) {
  switch (action.type) {
    case actionTypes.changeUserName:

      return { ...state, name: action.name };

    case actionTypes.changeUserAge:
      return { ...state, age: action.age };

    default:
      return state;
  }
}

const initialTweetsState = [];

export function tweets(state = initialTweetsState, action) {
  switch (action.type) {
    case actionTypes.sendTweet:
      // throw new Error(`Argh! ${action.text}`);
      return [action.text, ...state];

    default:
      return state;
  }
}