import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./Auth";
import setSongSlice from './setSong'

const store = configureStore({
  reducer: {
    auth: authSlice,
    setSong:setSongSlice,
  }
});

export default store;
