import { configureStore } from "@reduxjs/toolkit";
import playlistSlice from "./playlist"; 
import songDataSlice from "./songDataState";
import authSlice from "./Auth";

const store = configureStore({
  reducer: {
    songsData: songDataSlice,
    playlists: playlistSlice,
    auth: authSlice,
  }
});

export default store;
