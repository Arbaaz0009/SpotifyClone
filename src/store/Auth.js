import { createSlice } from "@reduxjs/toolkit";
import { tokenManager } from "../utils/tokenManager";

let Token = localStorage.getItem("token");
let TokenExpiry = localStorage.getItem("tokenExpiry");
let RefreshToken = localStorage.getItem("refreshToken");

const initialState = Token
  ? {
      isAuthenticated: true,
      token: Token || null,
      tokenExpiry: TokenExpiry || null,
      refreshToken: RefreshToken || null,
      userName: "",
      img: "",
    }
  : {
      isAuthenticated: false,
      token: null,
      tokenExpiry: null,
      refreshToken: null,
      userName: "",
      img: "",
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.tokenExpiry = action.payload.expiresIn;
      state.refreshToken = action.payload.refreshToken;
      
      // Store in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("tokenExpiry", action.payload.expiresIn);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      
      // Set in token manager
      tokenManager.setTokens(
        action.payload.token,
        action.payload.expiresIn,
        action.payload.refreshToken
      );
    },
    loginUser(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.tokenExpiry = action.payload.expiresIn;
      state.refreshToken = action.payload.refreshToken;
      
      // Store in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("tokenExpiry", action.payload.expiresIn);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      
      // Set in token manager
      tokenManager.setTokens(
        action.payload.token,
        action.payload.expiresIn,
        action.payload.refreshToken
      );
    },
    updateToken(state, action) {
      state.token = action.payload.token;
      state.tokenExpiry = action.payload.expiresIn;
      
      // Update localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("tokenExpiry", action.payload.expiresIn);
      
      // Update token manager
      tokenManager.setTokens(
        action.payload.token,
        action.payload.expiresIn,
        state.refreshToken
      );
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.tokenExpiry = null;
      state.refreshToken = null;
      
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("refreshToken");
      
      // Clear token manager
      tokenManager.clearTokens();
    },
    setUserName(state, action) {
      state.userName = action.payload.userName;
      state.img = action.payload.img;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
