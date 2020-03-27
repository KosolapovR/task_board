import {
    UPDATE_TASK_BODY,
    CHANGE_TASK_STATUS,
    ADD_IN_WORK_TASK,
    ADD_ON_CHECK_TASK,
    ADD_COMPLETED_TASK,
    GET_CURRENT_TASK
} from "./types";

const initialState = {
    lastTaskIndex: 0,
    inWork: [],
    onCheck: [],
    completed: [],
    currentTask: {}
};

const reducer = (state = initialState, action) => {
        switch (action.type) {
            case UPDATE_TASK_BODY: {
                const newState = {...state};

                const inWorkUpdate = newState.inWork.some((el, i) => el.id === action.payload.id);
                const onCheckUpdate = newState.onCheck.some((el, i) => el.id === action.payload.id);
                const completedUpdate = newState.completed.some((el, i) => el.id === action.payload.id);
                switch (true) {
                    case inWorkUpdate: {
                        for (let i = 0; i < newState.inWork.length; i++) {
                            if (newState.inWork[i]['id'] === action.payload.id) {
                                newState.inWork[i] = action.payload;
                                return newState;
                            }
                        }
                        break;
                    }
                    case onCheckUpdate: {

                        for (let i = 0; i < newState.onCheck.length; i++) {
                            if (newState.onCheck[i]['id'] === action.payload.id) {
                                newState.onCheck[i] = action.payload;
                                return newState;
                            }
                        }
                        break;
                    }
                    case completedUpdate: {

                        for (let i = 0; i < newState.completed.length; i++) {
                            if (newState.completed[i]['id'] === action.payload.id) {
                                newState.completed[i] = action.payload;
                                return newState;
                            }
                        }
                        break;
                    }
                    default:
                        break;
                }
                return newState;
            }
            case CHANGE_TASK_STATUS: {
                return {
                    ...state,
                    inWork: action.payload.inWork,
                    onCheck: action.payload.onCheck,
                    completed: action.payload.completed
                };
            }
            case ADD_IN_WORK_TASK: {
                return {
                    ...state,
                    inWork: [...state.inWork, {id: `item-${state.lastTaskIndex + 1}`, header: action.payload, body: ''}],
                    lastTaskIndex: state.lastTaskIndex + 1
                };
            }
            case
            ADD_ON_CHECK_TASK: {
                return {
                    ...state,
                    onCheck: [...state.onCheck, {id: `item-${state.lastTaskIndex + 1}`, header: action.payload, body: ''}],
                    lastTaskIndex: state.lastTaskIndex + 1
                }
            }
            case
            ADD_COMPLETED_TASK: {
                return {
                    ...state,
                    completed: [...state.completed, {
                        id: `item-${state.lastTaskIndex + 1}`,
                        header: action.payload,
                        body: ''
                    }],
                    lastTaskIndex: state.lastTaskIndex + 1
                }
            }
            case GET_CURRENT_TASK: {
                const newState = {...state};

                const inWorkUpdate = newState.inWork.filter((el, i) => el.id === action.payload.id);
                const onCheckUpdate = newState.onCheck.filter((el, i) => el.id === action.payload.id);
                const completedUpdate = newState.completed.filter((el, i) => el.id === action.payload.id);
                switch (1) {
                    case inWorkUpdate.length: {
                        for (let i = 0; i < newState.inWork.length; i++) {
                            if (newState.inWork[i]['id'] === action.payload.id) {
                                newState.currentTask = newState.inWork[i];
                                return newState;
                            }
                        }
                        break;
                    }
                    case onCheckUpdate.length: {

                        for (let i = 0; i < newState.onCheck.length; i++) {
                            if (newState.onCheck[i]['id'] === action.payload.id) {
                                newState.currentTask = newState.onCheck[i];
                                return newState;
                            }
                        }
                        break;
                    }
                    case completedUpdate.length: {

                        for (let i = 0; i < newState.completed.length; i++) {
                            if (newState.completed[i]['id'] === action.payload.id) {
                                newState.currentTask = newState.completed[i];
                                return newState;
                            }
                        }
                        break;
                    }
                    default:
                        break;
                }
                return newState;
            }
            default:
                return state;
        }
    }
;

export default reducer;
