import { combineReducers } from "@reduxjs/toolkit";
import { tasksSlice } from "../../features/Tasks/store/tasksSlice";
import { layoutSlice } from "../../features/Layout/store/layoutSlice";

export const appReducer = combineReducers({
  [tasksSlice.reducerPath]: tasksSlice.reducer,
  [layoutSlice.reducerPath]: layoutSlice.reducer,
});
