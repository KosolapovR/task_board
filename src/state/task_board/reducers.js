import { UPDATE_TASK_BODY, CHANGE_TASK_STATUS } from "./types";

const initialState = {
  inWork: [
    { id: "item-0", header: "Первая задача", body: "Описание первой задачи" }
  ],
  onCheck: [
    { id: "item-1", header: "Вторая задача", body: "Описание второй задачи" }
  ],
  completed: [
    { id: "item-2", header: "Третья задача", body: "Описание третьей задачи" }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TASK_BODY: {
      return { ...state };
    }
    case CHANGE_TASK_STATUS: {
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
