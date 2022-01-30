import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface I18nState {
  translations: { [key: string]: string };
}

const initialState: I18nState = {
  translations: {},
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    updateTranslations: (
      state,
      action: PayloadAction<{ [key: string]: string }>,
    ) => {
      state.translations = action.payload;
    },
  },
});

export const { updateTranslations } = i18nSlice.actions;

export default i18nSlice.reducer;
