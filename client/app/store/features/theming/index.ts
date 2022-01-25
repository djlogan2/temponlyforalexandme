import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemingState {
  classes: { [key: string]: string };
}

const initialState: ThemingState = {
  classes: {},
};

export const themingSlice = createSlice({
  name: "theming",
  initialState,
  reducers: {
    updateClasses: (
      state,
      action: PayloadAction<{ [key: string]: string }>,
    ) => {
      state.classes = action.payload;
    },
  },
});

export const { updateClasses } = themingSlice.actions;

export default themingSlice.reducer;
