import { configureStore } from "@reduxjs/toolkit";
import playlistSlice from "./playlist"; 
import songDataSlice from "./songDataState";
import authSlice from "./Auth";
import setSongSlice from './setSong'

const store = configureStore({
  reducer: {
    auth: authSlice,
    setSong:setSongSlice,
  }
});

export default store;
