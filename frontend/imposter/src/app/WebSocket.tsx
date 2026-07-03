import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useDispatch } from "react-redux";
// import { attachPlayer } from "../features/player/PlayerSlice"; // Your slice
import { attachGamesList, detachGamesList } from "../features/game/GamesSlice";
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

      // Subscribe to a specific game topic
      client.subscribe(`/topic/game`, (message) => {
        console.log(message);
        if (message.body) {
          console.log(message.body);
          const gamesArray = JSON.parse(message.body);
      
          dispatch(attachGamesList(gamesArray));
        }
      });
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
    };

    // 3. Activate the connection
    client.activate();
    clientRef.current = client;

    // 4. Cleanup: Disconnect when the component unmounts or gameId changes
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        console.log("Disconnected WebSocket");
      }
    };
  }, [playerID, dispatch]);

//   // Function to send a message to the backend
//   const sendVote = (votedPlayerId: number) => {
//     if (clientRef.current && clientRef.current.connected) {
//       clientRef.current.publish({
//         destination: "/app/vote", // Maps to @MessageMapping("/vote") in Spring
//         body: JSON.stringify({ votedPlayerId }),
//       });
//     }
//   };

//   return { sendVote };
};