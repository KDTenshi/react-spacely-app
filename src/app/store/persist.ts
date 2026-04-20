import { tasksInitialState } from "../../features/Tasks/store/tasksSlice";
import { appStore } from "./appStore";

export const loadBoards = () => {
  try {
    const boardsListJSON = localStorage.getItem("boardsList");

    if (!boardsListJSON) return undefined;

    return {
      tasks: {
        ...tasksInitialState,
        boardsList: JSON.parse(boardsListJSON),
      },
    };
  } catch {
    return undefined;
  }
};

export const saveBoardsList = () => {
  const state = appStore.getState();
  const { boardsList } = state.tasks;

  localStorage.setItem("boardsList", JSON.stringify(boardsList));
};
