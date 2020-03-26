import {ADD_TASK, UPDATE_TASK_BODY} from "./types";
import {CHANGE_TASK_STATUS} from "./types";

const updateTaskBody = payload => ({
  type: UPDATE_TASK_BODY,
  payload
});

const changeTaskStatus = payload => ({
  type: CHANGE_TASK_STATUS,
  payload
});

const addTask = payload => ({
  type: ADD_TASK,
  payload
});

export { updateTaskBody, changeTaskStatus, addTask };
