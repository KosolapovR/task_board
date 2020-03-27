import {ADD_COMPLETED_TASK, ADD_IN_WORK_TASK, ADD_ON_CHECK_TASK, GET_CURRENT_TASK, UPDATE_TASK_BODY} from "./types";
import {CHANGE_TASK_STATUS} from "./types";

const updateTaskBody = payload => ({
    type: UPDATE_TASK_BODY,
    payload
});

const changeTaskStatus = payload => ({
    type: CHANGE_TASK_STATUS,
    payload
});

const addInWorkTask = payload => ({
    type: ADD_IN_WORK_TASK,
    payload
});

const addOnCheckTask = payload => ({
    type: ADD_ON_CHECK_TASK,
    payload
});

const addCompletedTask = payload => ({
    type: ADD_COMPLETED_TASK,
    payload
});

const getCurrentTask = payload => ({
    type: GET_CURRENT_TASK,
    payload
});

export {updateTaskBody, changeTaskStatus, addCompletedTask, addInWorkTask, addOnCheckTask, getCurrentTask};
