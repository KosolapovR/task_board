import {UPDATE_TASK_BODY, CHANGE_TASK_STATUS} from "./types";

const initialState = {
    inWork: [
        {id: "item-0", header: "Первая задача", body: "Описание первой задачи"},
        {id: "item-1", header: "Первая-a задача", body: "Описание первой-a задачи"}
    ],
    onCheck: [
        {id: "item-2", header: "Вторая задача", body: "Описание второй задачи"}
    ],
    completed: [
        {id: "item-3", header: "Третья задача", body: "Описание третьей задачи"}
    ]
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
                    for(let i = 0; i < newState.inWork.length; i++) {
                        if(newState.inWork[i]['id'] === action.payload.id) {
                            newState.inWork[i] = action.payload;
                            return newState;
                        }
                    }
                    break;
                }
                case onCheckUpdate: {

                    for(let i = 0; i < newState.onCheck.length; i++) {
                        if(newState.onCheck[i]['id'] === action.payload.id) {
                            newState.onCheck[i] = action.payload;
                            return newState;
                        }
                    }
                    break;
                }
                case completedUpdate: {

                    for(let i = 0; i < newState.completed.length; i++) {
                        if(newState.completed[i]['id'] === action.payload.id) {
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
        default:
            return state;
    }
};

export default reducer;
