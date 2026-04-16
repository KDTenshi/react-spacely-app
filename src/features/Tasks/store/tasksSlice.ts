import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { TBoard, TColumnType, TTask, TTaskPriority } from "../../../shared/types/types";
import { arrayMove } from "@dnd-kit/sortable";

type TasksState = {
  boardsList: { [key in string]: TBoard };

  selectedBoardID: string | null;

  editingTaskID: string | null;
  draggingTaskID: string | null;
};

const initialState: TasksState = {
  boardsList: {},

  selectedBoardID: null,

  editingTaskID: null,
  draggingTaskID: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      const board: TBoard = {
        id: nanoid(),
        name,
        columns: {
          todo: [],
          doing: [],
          done: [],
        },
        tasksList: {},
      };

      state.boardsList[board.id] = board;
    },

    deleteBoard: (state) => {
      const boardID = state.selectedBoardID;

      if (!boardID) return;

      delete state.boardsList[boardID];
    },

    editBoard: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      const boardID = state.selectedBoardID;

      if (!boardID) return;

      state.boardsList[boardID] = { ...state.boardsList[boardID], name };
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

      state.boardsList[boardID].tasksList[task.id] = task;
      state.boardsList[boardID].columns.todo.push(task.id);
    },

    deleteTask: (state, action: PayloadAction<{ taskID: string }>) => {
      const { taskID } = action.payload;

      const boardID = state.selectedBoardID;

      if (!boardID) return;

      const task = state.boardsList[boardID].tasksList[taskID];

      delete state.boardsList[boardID].tasksList[taskID];
      state.boardsList[boardID].columns[task.column] = state.boardsList[boardID].columns[task.column].filter(
        (id) => id !== taskID,
      );
    },

    editTask: (state, action: PayloadAction<{ name: string; description: string; priority: TTaskPriority }>) => {
      const { name, description, priority } = action.payload;

      const taskID = state.editingTaskID;
      const boardID = state.selectedBoardID;

      if (!taskID || !boardID) return;

      state.boardsList[boardID].tasksList[taskID] = {
        ...state.boardsList[boardID].tasksList[taskID],
        name,
        description,
        priority,
      };
    },

    changeTaskColumn: (state, action: PayloadAction<{ taskID: string; column: TColumnType }>) => {
      const { taskID, column } = action.payload;

      const boardID = state.selectedBoardID;

      if (!boardID) return;

      const task = state.boardsList[boardID].tasksList[taskID];
      const oldColumn = task.column;

      task.column = column;

      state.boardsList[boardID].columns[oldColumn] = state.boardsList[boardID].columns[oldColumn].filter(
        (id) => id !== taskID,
      );
      state.boardsList[boardID].columns[column].push(taskID);
    },

    changeTaskPosition: (state, action: PayloadAction<{ activeTaskID: string; overTaskID: string }>) => {
      const { activeTaskID, overTaskID } = action.payload;

      const boardID = state.selectedBoardID;

      if (!boardID) return;

      const column = state.boardsList[boardID].tasksList[activeTaskID].column;

      const activeTaskIndex = state.boardsList[boardID].columns[column].findIndex((id) => id === activeTaskID);
      const overTaskIndex = state.boardsList[boardID].columns[column].findIndex((id) => id === overTaskID);

      state.boardsList[boardID].columns[column] = arrayMove(
        state.boardsList[boardID].columns[column],
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
  deleteBoard,
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
} = tasksSlice.actions;
