import { createSlice } from "@reduxjs/toolkit";
let Token = localStorage.getItem("token");
const initialState = Token
  ? {
      isAuthenticated: true,
      token: Token,
    }
  : {
      isAuthenticated: false,
      token: "",
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    loginUser(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.token = "";
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
