import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface game {
    id: number,
    category: string,
    topic: string
}
interface player {
    id: number | null,
    name: string | null,
    imposter: boolean,
    game: game | null,
    votedPlayer: player | null
}

const storedPlayer = localStorage.getItem("player");

const initialState: player = storedPlayer 
    ? JSON.parse(storedPlayer) 
    : {
        id: null,
        name: null,
        imposter: false,
        game: null,
        votedPlayer: null
      };

export const PlayerSlice = createSlice({
    name: "player",
    initialState: initialState, 
    reducers: {
        attachPlayer: (state, action: PayloadAction<player>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.imposter = action.payload.imposter;
            state.game = action.payload.game;
            state.votedPlayer = action.payload.votedPlayer;

            localStorage.setItem("player", JSON.stringify(action.payload));
        },
        detachPlayer: (state) => {
            state.id = null;
            state.name = null;
            state.imposter = false;
            state.game = null;
            state.votedPlayer = null;    
            
            localStorage.removeItem("player");
        }
    }
});

export const { attachPlayer, detachPlayer } = PlayerSlice.actions;

export default PlayerSlice.reducer;