import { configureStore } from "@reduxjs/toolkit";
import themingReducer from "./features/theming";

export const store = configureStore({
  reducer: {
    theming: themingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
