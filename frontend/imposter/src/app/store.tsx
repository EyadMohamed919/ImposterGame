import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../features/player/PlayerSlice";
import gamesReducer from "../features/game/GamesSlice";
export const store = configureStore({
  reducer: {
    player:playerReducer,
    games:gamesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;