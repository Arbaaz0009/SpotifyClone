import { createSlice } from "@reduxjs/toolkit";
import heartimg from "/svgs/heartimg.png";
import apiClient from "../spotify";

let Playlists ;

const initialState = [
  {
    id: "",
    title: "liked Songs",
    albumimg: heartimg,
    songs: [],
  },
];

const playlistSlice = createSlice({
  name: "playlists",
  initialState : Playlists,
  reducer: {
    addPlaylist() {
      const nextPlalist = [
        ...initialState,
        {
          isArtist: false,
          title: title,
          albumimg: undefined,
        },
      ];
      initialState = nextPlalist;
    },
    removePlaylist() {},
  },
});

export const playlistAction = playlistSlice.actions;
export default playlistSlice;
