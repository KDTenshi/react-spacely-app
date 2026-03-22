import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { TBoard, TColumnType, TTask, TTaskPriority } from "../types/types";
import { arrayMove } from "@dnd-kit/sortable";

type TasksState = {
  tasksList: { [key: string]: TTask };
  columns: { [key in TColumnType]: string[] };
  selectedTaskID: string | null;
  editingTaskData: { id: string; boardID: string } | null;

  boards: { [key in string]: TBoard };
};

const initialState: TasksState = {
  tasksList: {},
  columns: {
    todo: [],
    doing: [],
    done: [],
  },
  selectedTaskID: null,
  editingTaskData: null,

  boards: {},
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ name: string; boardID: string }>) => {
      const { name, boardID } = action.payload;

      const task: TTask = {
        id: nanoid(),
        name,
        description: "",
        createdAt: Date.now(),
        column: "todo",
        boardID,
        priority: "low",
      };

      state.boards[boardID].tasksList[task.id] = task;
      state.boards[boardID].columns.todo.push(task.id);
    },
    deleteTask: (state, action: PayloadAction<{ taskID: string; boardID: string }>) => {
      const { taskID, boardID } = action.payload;

      const task = state.boards[boardID].tasksList[taskID];

      if (state.editingTaskData?.id === taskID) {
        state.editingTaskData = null;
      }

      state.boards[boardID].columns[task.column] = state.boards[boardID].columns[task.column].filter(
        (id) => id !== taskID,
      );
      delete state.boards[boardID].tasksList[taskID];
    },
    changeTaskColumn: (state, action: PayloadAction<{ taskID: string; column: TColumnType; boardID: string }>) => {
      const { taskID, column, boardID } = action.payload;

      const task = state.boards[boardID].tasksList[taskID];
      const oldColumn = task.column;

      task.column = column;

      state.boards[boardID].columns[oldColumn] = state.boards[boardID].columns[oldColumn].filter((id) => id !== taskID);
      state.boards[boardID].columns[column].push(taskID);
    },
    changeTaskPosition: (
      state,
      action: PayloadAction<{ activeTaskID: string; overTaskID: string; boardID: string }>,
    ) => {
      const { activeTaskID, overTaskID, boardID } = action.payload;

      const column = state.boards[boardID].tasksList[activeTaskID].column;

      const activeTaskIDIndex = state.boards[boardID].columns[column].findIndex((id) => id === activeTaskID);
      const overTaskIDIndex = state.boards[boardID].columns[column].findIndex((id) => id === overTaskID);

      state.boards[boardID].columns[column] = arrayMove(
        state.boards[boardID].columns[column],
        activeTaskIDIndex,
        overTaskIDIndex,
      );
    },
    setSelectedTaskID: (state, action: PayloadAction<{ taskID: string }>) => {
      const { taskID } = action.payload;

      state.selectedTaskID = taskID;
    },
    clearSelectedTaskID: (state) => {
      state.selectedTaskID = null;
    },
    setEditingTaskData: (state, action: PayloadAction<{ taskID: string; boardID: string }>) => {
      const { taskID, boardID } = action.payload;

      state.editingTaskData = { id: taskID, boardID };
    },
    clearEditingTaskData: (state) => {
      state.editingTaskData = null;
    },
    editTask: (
      state,
      action: PayloadAction<{
        taskID: string;
        name: string;
        description: string;
        priority: TTaskPriority;
        boardID: string;
      }>,
    ) => {
      const { taskID, name, description, priority, boardID } = action.payload;

      const task = state.boards[boardID].tasksList[taskID];

      task.name = name;
      task.description = description;
      task.priority = priority;
    },

    addBoard: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      const board: TBoard = {
        id: nanoid(),
        name,
        tasksList: {},
        columns: {
          todo: [],
          doing: [],
          done: [],
        },
      };

      state.boards[board.id] = board;
    },
  },
});

export const {
  addTask,
  deleteTask,
  changeTaskColumn,
  changeTaskPosition,
  setSelectedTaskID,
  clearSelectedTaskID,
  setEditingTaskData,
  clearEditingTaskData,
  editTask,

  addBoard,
} = tasksSlice.actions;
