import { createSlice } from "@reduxjs/toolkit";
import heartimg from '/svgs/heartimg.png'
const initialState = [
  {
    id:'',
    title: "liked Songs",
    albumimg: heartimg,
    songs: [],
  },
];

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducer: {
    addPlaylist(){
        const nextPlalist = [
            ...initialState,
            {
              isArtist: false,
              title: title,
              albumimg: undefined,
            }
          ];
          initialState = nextPlalist;
    },
    removePlaylist(){
        
    }


  },
});

export const playlistAction = playlistSlice.actions;
export default playlistSlice;