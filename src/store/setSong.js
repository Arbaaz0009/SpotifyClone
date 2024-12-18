import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    img:'',
    title:'',
    artist:'',
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

        }
    },

}
)

export const setSongAction = setSongSlice.actions;
export default setSongSlice.reducer;