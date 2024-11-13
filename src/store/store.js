import { configureStore } from "@reduxjs/toolkit";
import playlistSlice from "./playlist"; 
import songDataSlice from "./songDataState";

const store = configureStore({
  reducer: {
    songsData: songDataSlice,
    playlists: playlistSlice,
  }
});

export default store;
