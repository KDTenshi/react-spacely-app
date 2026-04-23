import { tasksInitialState, type TasksState } from "../../features/Tasks/store/tasksSlice";
import { LOCAL_STORAGE_KEYS } from "../../shared/constants/localStorageKeys";
import { appStore } from "./appStore";

export const loadBoards = () => {
  try {
    const boardsByIDsJSON = localStorage.getItem(LOCAL_STORAGE_KEYS.BOARDS_BY_IDS);
    const boardsOrderJSON = localStorage.getItem(LOCAL_STORAGE_KEYS.BOARDS_ORDER);
    const tasksByIDsJSON = localStorage.getItem(LOCAL_STORAGE_KEYS.TASKS_BY_IDS);
    const recentBoardsIDsJSON = localStorage.getItem(LOCAL_STORAGE_KEYS.RECENT_BOARDS_IDS);

    if (!boardsByIDsJSON || !boardsOrderJSON || !tasksByIDsJSON || !recentBoardsIDsJSON) return undefined;

    const persistedTasksState: TasksState = {
      ...tasksInitialState,

      boardsByID: JSON.parse(boardsByIDsJSON),
      tasksByID: JSON.parse(tasksByIDsJSON),
      boardsOrder: JSON.parse(boardsOrderJSON),
      recentBoardsIDs: JSON.parse(recentBoardsIDsJSON),
    };

    return {
      tasks: persistedTasksState,
    };
  } catch {
    return undefined;
  }
};

export const saveBoardsList = () => {
  const state = appStore.getState();
  const { tasksByID, boardsByID, boardsOrder, recentBoardsIDs } = state.tasks;

  localStorage.setItem(LOCAL_STORAGE_KEYS.BOARDS_BY_IDS, JSON.stringify(boardsByID));
  localStorage.setItem(LOCAL_STORAGE_KEYS.TASKS_BY_IDS, JSON.stringify(tasksByID));
  localStorage.setItem(LOCAL_STORAGE_KEYS.BOARDS_ORDER, JSON.stringify(boardsOrder));
  localStorage.setItem(LOCAL_STORAGE_KEYS.RECENT_BOARDS_IDS, JSON.stringify(recentBoardsIDs));
};
