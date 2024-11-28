import { createSlice } from "@reduxjs/toolkit";
let Token = localStorage.getItem("token");
const initialState = Token
  ? {
      isAuthenticated: true,
      token: Token,
      userName:'',
    }
  : {
      isAuthenticated: false,
      token: "",
      userName:'',
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
    setUserName(state, action) {
      state.userName = action.payload;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
