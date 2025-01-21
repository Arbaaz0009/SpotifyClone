import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    img:'',
    title:'',
    artist:'',
    uri:'',
    id:''
}

const setSongSlice = createSlice(
{
    name:"setsong",
    initialState,
    reducers:{
        updateSong(state,action){
            state.img=action.payload.img;
            state.title=action.payload.title;
            state.artist = action.payload.artist ;
            state.uri = action.payload.uri;
            state.id = action.payload.id;
        }
    },

}
)

export const setSongAction = setSongSlice.actions;
export default setSongSlice.reducer;