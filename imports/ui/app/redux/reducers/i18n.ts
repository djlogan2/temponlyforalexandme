import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tracker } from "meteor/tracker";
import ICCServer from "../../../../client/clienticcserver";
import { I18nRecord } from "../../../../models/i18nrecord";
import { getLang } from "../../data/utils/common";

export interface I18nState {
  translations: I18nRecord;
  isReady: boolean;
}

const initialState: I18nState = {
  translations: null,
  isReady: false,
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    i18nSubscribe: (state, action: PayloadAction<I18nState>) => {
      state.translations = action.payload.translations;
      state.isReady = action.payload.isReady;
    },
  },
});

export const { i18nSubscribe } = i18nSlice.actions;

export const subscribeToI18n = createAsyncThunk(
  "i18n/subscribeToI18n",
  (_, { dispatch }) => {
    Tracker.autorun(() => {
      const translations = ICCServer.collections.i18n.findOne();
      const subscription = Meteor.subscribe(
        "clientInternationalization",
        getLang(),
      );
      const isReady = subscription.ready();

      dispatch(i18nSubscribe({ translations, isReady }));
    });
  },
);

export default i18nSlice.reducer;
