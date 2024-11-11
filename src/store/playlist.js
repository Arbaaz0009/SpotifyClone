import { createSlice } from "@reduxjs/toolkit";
import heartimg from '../assets/svgs/heartimg.png'
const initialState = [
  {
    id:'',
    isArtist: false,
    title: "liked Songs",
    albumimg: heartimg,
    songs: [],
  },
];

const playlistSlice = createSlice({
  name: playlists,
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
export default playlistSlice