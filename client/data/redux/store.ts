import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { Tracker } from 'meteor/tracker';
import createReactiveMiddlewares from 'meteor-redux-middlewares';

import authReducer from "./reducers/authReducer";

const {
  sources,
  subscriptions,
} = createReactiveMiddlewares(Tracker);

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sources, subscriptions),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
