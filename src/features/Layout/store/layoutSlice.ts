import { createSlice } from "@reduxjs/toolkit";

type LayoutState = {
  isSideMenuShown: boolean;
};

const initialState: LayoutState = {
  isSideMenuShown: true,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    switchSideMenuStatus: (state) => {
      state.isSideMenuShown = !state.isSideMenuShown;
    },
  },
});

export const { switchSideMenuStatus } = layoutSlice.actions;
