import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useDispatch } from "react-redux";
import { attachGamesList } from "../features/game/GamesSlice";

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

// --- Hook 2: Specific Game Instance WebSocket (FIXED) ---
export const connectToCurrentGameSocket = (id: number | null) => {
  const clientRef = useRef<Client | null>(null);
  console.log("We r here");
  
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
          // Handle your state/dispatch logic for the active game here
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