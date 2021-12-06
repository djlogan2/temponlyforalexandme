import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ClientICCServer from '../../../../imports/client/clienticcserver';
import { RootState } from '../store';

export interface AuthState {
  userId?: string;
  loggingIn?: boolean;
  loggingIn2?: string;
}

const initialState: AuthState = {
  userId: localStorage.getItem("Meteor.userId"),
  loggingIn: false,
};

interface loginAsyncProps {
  email: string,
  password: string,
}

interface registerAsyncProps {
  email: string,
  password: string,
  username: string,
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

export const registerAsync = createAsyncThunk(
    "auth/register",
    async ({ email, username, password }: registerAsyncProps) => {
      await ClientICCServer.createUser({
        email,
        username,
        password,
        callback: (err) => {
          console.log("HEYYYYYY: ", err);
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
    loginSync: (state, action) => {
      ClientICCServer.loginWithPassword({
        ...action.payload,
        callback: (err) => {
          console.log("redux error login", err);
        },
      });
    },
    loggingIn: (state, action) => {
      state.loggingIn = action.payload.data;
    },
    loggingIn2: (state, action) => {
      state.loggingIn2 = action.payload.data;
    },
    loggedIn: (state, action) => {
      console.log("loggedIn");
      state.userId = action.payload.data?._id ? action.payload.data._id : null;
      state.loggingIn2 = "";
    },

    logout: (state) => {
      Meteor.logout();
      state.userId = null;
      console.log("logout reducer", state);
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(loginAsync.fulfilled, (state, action) => {
    //   state.userId = action.payload;
    // });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.userId = action.payload;
    });
  },
});

export const {
  logout, loggingIn, loggingIn2, loggedIn, loginSync
} = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserId = (state: RootState) => state.auth?.userId;

export default authSlice.reducer;
