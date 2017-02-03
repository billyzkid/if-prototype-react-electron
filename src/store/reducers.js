import { combineReducers } from "redux";

const initialDataState = {
  fetching: false,
  fetched: false,
  users: [],
  error
};

const initialUserState = {
  name,
  age
};

const initialTweetsState = [];

export function data(state = initialDataState, action) {
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

export function user(state = initialUserState, action) {
  switch (action.type) {
    case "CHANGE_USER_NAME":
      return { ...state, name: action.payload };

    case "CHANGE_USER_AGE":
      return { ...state, age: action.payload };

    default:
      return state;
  }
};

export function tweets(state = initialTweetsState, action) {
  switch (action.type) {
    case "SEND_TWEET":
      throw new Error("Argh!")

    default:
      return state;
  }
};