import { createSlice } from "@reduxjs/toolkit";
import type { TBoard } from "../shared/types/types";

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
  reducers: {},
});
