import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  users: [], // Array to store user emails and passwords
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser(state, action) {
      const { email, password } = action.payload;
      state.users.push({ email, password });
    },
    loginUser(state, action) {
      const { email, password } = action.payload;
      const user = state.users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
    logoutUser(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice;
