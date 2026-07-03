import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface game {
    id: number,
    category: string,
    topic: string
}

const initialState: game[] = [];
export const GamesSlice = createSlice({
    name:"games",
    initialState: initialState,
    reducers:{
        attachGamesList: (state, action: PayloadAction<game[]>)=>{
            return action.payload;
        },
        detachGamesList: ()=>{
            return [];
        }
    }
});

export const { attachGamesList, detachGamesList } = GamesSlice.actions;
export default GamesSlice.reducer;