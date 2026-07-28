import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../features/player/PlayerSlice";
import gamesReducer from "../features/game/GamesSlice";
import playerListReducer from "../features/player/PlayerListSlice";
export const store = configureStore({
  reducer: {
    player:playerReducer,
    games:gamesReducer,
    playerListInGame:playerListReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;