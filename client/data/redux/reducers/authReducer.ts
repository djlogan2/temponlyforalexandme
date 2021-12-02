import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ClientICCServer from '../../../../imports/client/clienticcserver';
import { RootState } from '../store';

export interface AuthState {
  userId?: string;
}

const initialState: AuthState = {
  userId: localStorage.getItem("Meteor.userId"),
};

interface loginAsyncProps {
  email: string,
  password: string,
}

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }: loginAsyncProps) => {
    await ClientICCServer.loginWithPassword({
      email,
      password,
      callback: (err) => {
        console.log("redux error login", err);
      },
    });

    return localStorage.getItem("Meteor.userId");
  },
);

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // login: (state, action) => {
    //   console.log(action, "login reducer");
    //   // eslint-disable-next-line no-param-reassign
    //   state.userId = localStorage.getItem("Meteor.userId");
    // },
    logout: (state) => {
      console.log("logout reducer", state);
      // eslint-disable-next-line no-param-reassign
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.userId = action.payload;
    });
  },
});

export const {
  logout,
} = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserId = (state: RootState) => state.auth?.userId;

export default authSlice.reducer;
