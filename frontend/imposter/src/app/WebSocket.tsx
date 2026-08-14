import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useDispatch, useSelector } from "react-redux";
import { attachGamesList } from "../features/game/GamesSlice";
import { attachPlayerList } from "../features/player/PlayerListSlice";
import type { RootState } from "./store";
import { attachPlayer } from "../features/player/PlayerSlice";

// --- Hook 1: General Game List WebSocket ---
export const useGameWebSocket = (playerID: number | null) => {
  const dispatch = useDispatch();
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!playerID) return;

    const client = new Client({
      brokerURL: "ws://localhost:8080/imposter-websocket", 
      reconnectDelay: 5000, 
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");
      client.subscribe(`/topic/game`, (message) => {
        if (message.body) {
          const gamesArray = JSON.parse(message.body);
          dispatch(attachGamesList(gamesArray));
        }
      });
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        console.log("Disconnected WebSocket");
      }
    };
  }, [playerID, dispatch]);
};

export const useCurrentGameWebSocket = (id: number | null) => {
  const clientRef = useRef<Client | null>(null);
  const player = useSelector((state:RootState)=>state.player);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) return;

    const client = new Client({
      brokerURL: "ws://localhost:8080/imposter-websocket",
      reconnectDelay: 5000, 
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log(`Connected to Current Game Socket: ${id}`);
      client.subscribe(`/topic/game/` + id, (message) => {
        if (message.body) {
        console.log("Game Update:", message.body);

        const updatedStatus = message.body;

        if (player?.game) {
          const updatedPlayer = {
            ...player,
            game: {
              ...player.game,
              status: updatedStatus,
            },
          };

          dispatch(attachPlayer(updatedPlayer));
        }
      }
      });

      client.subscribe("/topic/game/" + id + "/players", (message) => {
        if (message.body) {
          console.log("Player List:", message.body);
          const playerList = JSON.parse(message.body)
          dispatch(attachPlayerList(playerList));
        }
      });
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        console.log(`Disconnected Game WebSocket: ${id}`);
      }
    };
  }, [id]); // Reconnects if the game ID changes
};