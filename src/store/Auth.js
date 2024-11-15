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
      
    },
    logoutUser(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice;
