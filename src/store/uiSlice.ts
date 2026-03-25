import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  isSideMenuShown: boolean;
};

const initialState: UIState = {
  isSideMenuShown: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {},
});
