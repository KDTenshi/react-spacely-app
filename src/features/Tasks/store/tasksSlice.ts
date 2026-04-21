import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { TBoard, TColumnType, TTask, TTaskPriority } from "../../../shared/types/types";
import { arrayMove } from "@dnd-kit/sortable";

export type TasksState = {
  boardsByID: Record<string, TBoard>;
  tasksByID: Record<string, TTask>;

  boardsOrder: string[];

  editingTaskID: string | null;
  draggingTaskID: string | null;
};

export const tasksInitialState: TasksState = {
  boardsByID: {},
  tasksByID: {},

  boardsOrder: [],

  editingTaskID: null,
  draggingTaskID: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
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
      };

      state.boardsByID[board.id] = board;
      state.boardsOrder.push(board.id);
    },

    deleteBoard: (state, action: PayloadAction<{ boardID: string }>) => {
      const { boardID } = action.payload;

      const board = state.boardsByID[boardID];
      const boardTasksIDs = Object.values(board.columns).flat();

      for (const taskID of boardTasksIDs) {
        delete state.tasksByID[taskID];
      }

      state.boardsOrder = state.boardsOrder.filter((id) => id !== boardID);
      delete state.boardsByID[boardID];
    },

    editBoard: (state, action: PayloadAction<{ name: string; boardID: string }>) => {
      const { name, boardID } = action.payload;

      state.boardsByID[boardID].name = name;
    },

    createTask: (state, action: PayloadAction<{ name: string; boardID: string }>) => {
      const { name, boardID } = action.payload;

      const task: TTask = {
        id: nanoid(),
        name,
        description: "",
        column: "todo",
        boardID,
        createdAt: Date.now(),
        priority: "low",
      };

      state.tasksByID[task.id] = task;
      state.boardsByID[boardID].columns.todo.push(task.id);
    },

    deleteTask: (state, action: PayloadAction<{ taskID: string }>) => {
      const { taskID } = action.payload;

      const task = state.tasksByID[taskID];

      state.boardsByID[task.boardID].columns[task.column] = state.boardsByID[task.boardID].columns[task.column].filter(
        (id) => id !== taskID,
      );

      delete state.tasksByID[taskID];
    },

    editTask: (state, action: PayloadAction<{ name: string; description: string; priority: TTaskPriority }>) => {
      const { name, description, priority } = action.payload;

      const taskID = state.editingTaskID;

      if (!taskID) return;

      state.tasksByID[taskID] = { ...state.tasksByID[taskID], name, description, priority };
    },

    changeTaskColumn: (state, action: PayloadAction<{ taskID: string; column: TColumnType }>) => {
      const { taskID, column } = action.payload;

      const task = state.tasksByID[taskID];
      const oldColumn = task.column;

      task.column = column;

      state.boardsByID[task.boardID].columns[oldColumn] = state.boardsByID[task.boardID].columns[oldColumn].filter(
        (id) => id !== taskID,
      );

      state.boardsByID[task.boardID].columns[column].push(taskID);
    },

    changeTaskPosition: (state, action: PayloadAction<{ activeTaskID: string; overTaskID: string }>) => {
      const { activeTaskID, overTaskID } = action.payload;

      const boardID = state.tasksByID[activeTaskID].boardID;
      const column = state.tasksByID[activeTaskID].column;

      const activeIndex = state.boardsByID[boardID].columns[column].findIndex((id) => id === activeTaskID);
      const overIndex = state.boardsByID[boardID].columns[column].findIndex((id) => id === overTaskID);

      if (activeIndex === -1 || overIndex === -1) return;

      state.boardsByID[boardID].columns[column] = arrayMove(
        state.boardsByID[boardID].columns[column],
        activeIndex,
        overIndex,
      );
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
  setDraggingTaskID,
  clearDraggingTaskID,
  setEditingTaskID,
  clearEditingTaskID,
} = tasksSlice.actions;
