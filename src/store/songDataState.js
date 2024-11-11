import { createSlice } from "@reduxjs/toolkit";
import { songs } from "../songsData";
const initialState = songs;


const songDataSlice = createSlice({
  name: "songData",
  initialState,
  reducers: {
    addPlaylist: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export default songDataSlice.reducer;
export const songDataAction = songDataSlice.actions;
