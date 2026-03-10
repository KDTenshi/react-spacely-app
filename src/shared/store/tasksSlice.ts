import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumnType, TTask } from "../types/types";
import { arrayMove } from "@dnd-kit/sortable";

type TasksState = {
  tasksList: { [key: string]: TTask };
  columns: { [key in TColumnType]: string[] };
  selectedTaskID: string | null;
  editingTaskID: string | null;
};

const initialState: TasksState = {
  tasksList: {},
  columns: {
    todo: [],
    doing: [],
    done: [],
  },
  selectedTaskID: null,
  editingTaskID: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;

      const task: TTask = {
        id: nanoid(),
        name,
        description: "",
        column: "todo",
      };

      state.columns.todo.push(task.id);
      state.tasksList[task.id] = task;
    },
    deleteTask: (state, action: PayloadAction<{ taskID: string }>) => {
      const { taskID } = action.payload;

      const task = state.tasksList[taskID];

      state.columns[task.column] = state.columns[task.column].filter((id) => id !== taskID);
      delete state.tasksList[taskID];
    },
    changeTaskColumn: (state, action: PayloadAction<{ taskID: string; column: TColumnType }>) => {
      const { taskID, column } = action.payload;

      const task = state.tasksList[taskID];
      const oldColumn = task.column;

      task.column = column;
      state.columns[oldColumn] = state.columns[oldColumn].filter((id) => id !== taskID);
      state.columns[column].push(taskID);
    },
    changeTaskPosition: (state, action: PayloadAction<{ activeTaskID: string; overTaskID: string }>) => {
      const { activeTaskID, overTaskID } = action.payload;

      const column = state.tasksList[activeTaskID].column;

      const activeTaskIDIndex = state.columns[column].findIndex((id) => id === activeTaskID);
      const overTaskIDIndex = state.columns[column].findIndex((id) => id === overTaskID);

      state.columns[column] = arrayMove(state.columns[column], activeTaskIDIndex, overTaskIDIndex);
    },
    setSelectedTaskID: (state, action: PayloadAction<{ taskID: string }>) => {
      const { taskID } = action.payload;

      state.selectedTaskID = taskID;
    },
    clearSelectedTaskID: (state) => {
      state.selectedTaskID = null;
    },
    setEditingTaskID: (state, action: PayloadAction<{ taskID: string }>) => {
      const { taskID } = action.payload;

      state.editingTaskID = taskID;
    },
    clearEditingTaskID: (state) => {
      state.editingTaskID = null;
    },
    editTask: (state, action: PayloadAction<{ taskID: string; name: string; description: string }>) => {
      const { taskID, name, description } = action.payload;

      const task = state.tasksList[taskID];

      task.name = name;
      task.description = description;
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
  setEditingTaskID,
  clearEditingTaskID,
  editTask,
} = tasksSlice.actions;
