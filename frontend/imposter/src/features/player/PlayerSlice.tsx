import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface game{
    id:number,
    category:string,
    topic:string
}
interface player {
    id: number | null,
    name: string | null,
    isImposter:boolean,
    game:game | null,
    votedPlayer: player | null
}

const initialState: player = {
    id:null,
    name:null,
    isImposter:false,
    game:null,
    votedPlayer: null
};

export const PlayerSlice = createSlice({
    name:"player",
    initialState:initialState,
    reducers: {
        attachPlayer: (state, action: PayloadAction<player>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.isImposter = action.payload.isImposter;
            state.game = action.payload.game;
            state.votedPlayer = action.payload.votedPlayer;
        },
        detachPlayer: (state) => {
            state.id = null;
            state.name = null;
            state.isImposter = false;
            state.game = null;
            state.votedPlayer = null;
        }
    }
});

export const {attachPlayer, detachPlayer} = PlayerSlice.actions;

export default PlayerSlice.reducer;