import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type player } from "./PlayerSlice";


const initialState : player[] = [];
export const PlayerListSlice = createSlice({
    name:"playerList",
    initialState:initialState,
    reducers:{
        attachPlayerList: (state, action: PayloadAction<player[]>)=>{
            return action.payload;
        },
        detachGamesList: ()=>{
            return [];
        }
    }
});

export const {attachPlayerList} = PlayerListSlice.actions;
export default PlayerListSlice.reducer;