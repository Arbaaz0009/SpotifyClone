import { configureStore } from "@reduxjs/toolkit";

import songDataSlice from "./songDataState";

const store = configureStore({
  reducer: {
    songsData: songDataSlice,
  }
});

export default store;
