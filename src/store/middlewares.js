import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

export const thunkMiddleware = thunk;
export const promiseMiddleware = promise();

export const loggerMiddleware = (store) => (next) => (action) => {
  console.log("action fired", action);
  next(action);
};

export const errorMiddleware = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (x) {
    console.log("error occurred", x.message);
  }
};