import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { TBoard, TColumnType, TTask, TTaskPriority } from "../shared/types/types";
import { arrayMove } from "@dnd-kit/sortable";

type BoardsState = {
  list: { [key in string]: TBoard };

  selectedBoardID: string | null;

  editingTaskID: string | null;
  draggingTaskID: string | null;
};

const initialState: BoardsState = {
  list: {},

  selectedBoardID: null,

  editingTaskID: null,
  draggingTaskID: null,
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      const board: TBoard = {
        id: nanoid(),
        name,
        description: "",
        columns: {
          todo: [],
          doing: [],
          done: [],
        },
        tasksList: {},
      };

      state.list[board.id] = board;
    },

    editBoard: (state, action: PayloadAction<{ name: string; description: string }>) => {
      const { name, description } = action.payload;

      const boardID = state.selectedBoardID;

      if (!boardID) return;

      state.list[boardID] = { ...state.list[boardID], name, description };
    },

    createTask: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      const boardID = state.selectedBoardID;

      if (!boardID) return;

      const task: TTask = {
        id: nanoid(),
        name,
        description: "",
        column: "todo",
        boardID,
        createdAt: Date.now(),
        priority: "low",
      };

      state.list[boardID].tasksList[task.id] = task;
      state.list[boardID].columns.todo.push(task.id);
    },

    deleteTask: (state, action: PayloadAction<{ taskID: string }>) => {
      const { taskID } = action.payload;

      const boardID = state.selectedBoardID;

      if (!boardID) return;

      const task = state.list[boardID].tasksList[taskID];

      delete state.list[boardID].tasksList[taskID];
      state.list[boardID].columns[task.column] = state.list[boardID].columns[task.column].filter((id) => id !== taskID);
    },

    editTask: (state, action: PayloadAction<{ name: string; description: string; priority: TTaskPriority }>) => {
      const { name, description, priority } = action.payload;

      const taskID = state.editingTaskID;
      const boardID = state.selectedBoardID;

      if (!taskID || !boardID) return;

      state.list[boardID].tasksList[taskID] = { ...state.list[boardID].tasksList[taskID], name, description, priority };
    },

    changeTaskColumn: (state, action: PayloadAction<{ taskID: string; column: TColumnType }>) => {
      const { taskID, column } = action.payload;

      const boardID = state.selectedBoardID;

      if (!boardID) return;

      const task = state.list[boardID].tasksList[taskID];
      const oldColumn = task.column;

      task.column = column;

      state.list[boardID].columns[oldColumn] = state.list[boardID].columns[oldColumn].filter((id) => id !== taskID);
      state.list[boardID].columns[column].push(taskID);
    },

    changeTaskPosition: (state, action: PayloadAction<{ activeTaskID: string; overTaskID: string }>) => {
      const { activeTaskID, overTaskID } = action.payload;

      const boardID = state.selectedBoardID;

      if (!boardID) return;

      const column = state.list[boardID].tasksList[activeTaskID].column;

      const activeTaskIndex = state.list[boardID].columns[column].findIndex((id) => id === activeTaskID);
      const overTaskIndex = state.list[boardID].columns[column].findIndex((id) => id === overTaskID);

      state.list[boardID].columns[column] = arrayMove(
        state.list[boardID].columns[column],
        activeTaskIndex,
        overTaskIndex,
      );
    },

    setSelectedBoardID: (state, action: PayloadAction<string>) => {
      state.selectedBoardID = action.payload;
    },

    clearSelectedBoardID: (state) => {
      state.selectedBoardID = null;
    },

    setDraggingTaskID: (state, action: PayloadAction<string>) => {
      state.draggingTaskID = action.payload;
    },

    clearDraggingTaskID: (state) => {
      state.draggingTaskID = null;
    },

    setEditingTaskID: (state, action: PayloadAction<string>) => {
      state.editingTaskID = action.payload;
    },

    clearEditingTaskID: (state) => {
      state.editingTaskID = null;
    },
  },
});

export const {
  createBoard,
  editBoard,
  createTask,
  deleteTask,
  editTask,
  changeTaskColumn,
  changeTaskPosition,
  setSelectedBoardID,
  clearSelectedBoardID,
  setDraggingTaskID,
  clearDraggingTaskID,
  setEditingTaskID,
  clearEditingTaskID,
} = boardsSlice.actions;
