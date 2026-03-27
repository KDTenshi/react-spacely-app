import { combineReducers } from "@reduxjs/toolkit";
import { boardsSlice } from "../../store/boardsSlice";
import { uiSlice } from "../../store/uiSlice";

export const appReducer = combineReducers({
  [boardsSlice.reducerPath]: boardsSlice.reducer,
  [uiSlice.reducerPath]: uiSlice.reducer,
});
