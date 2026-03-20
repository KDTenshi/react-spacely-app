import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  isSideMenuShown: boolean;
};

const initialState: UIState = {
  isSideMenuShown: true,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    switchSideMenuStatus: (state) => {
      state.isSideMenuShown = !state.isSideMenuShown;
    },
  },
});

export const { switchSideMenuStatus } = uiSlice.actions;
