import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  token: any;
  user: any;
  error: any;
}

const initialState: UserState = {
  token: null,
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.token = null;
      state.user = null;
      state.error = action.payload.error;
    },
    signoutSuccess: (state) => {
      state.token = null;
      state.error = null;
      state.user = null;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, signoutSuccess } =
  userSlice.actions;

export default userSlice.reducer;
