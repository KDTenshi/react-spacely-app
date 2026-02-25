import { createSlice } from "@reduxjs/toolkit";
import type { TColumnType, TTask } from "../types/types";

type TasksState = {
  tasksList: { [key: string]: TTask };
  columns: { [key in TColumnType]: string[] };
};

const initialState: TasksState = {
  tasksList: {},
  columns: {
    todo: [],
    doing: [],
    done: [],
  },
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
});
