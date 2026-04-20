import { createSlice } from "@reduxjs/toolkit";

type LayoutState = {
  isSideMenuShown: boolean;
};

export const layoutInitialState: LayoutState = {
  isSideMenuShown: true,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState: layoutInitialState,
  reducers: {
    switchSideMenuStatus: (state) => {
      state.isSideMenuShown = !state.isSideMenuShown;
    },
  },
});

export const { switchSideMenuStatus } = layoutSlice.actions;
