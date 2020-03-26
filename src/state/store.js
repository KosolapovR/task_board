import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import task_board from "./task_board";
import { reducer as formReducer } from "redux-form";

export default function configureStore() {
  const rootReducer = combineReducers({ task_board, form: formReducer });

  return createStore(rootReducer, applyMiddleware(thunkMiddleware));
}
