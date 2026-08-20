import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import type { RootState } from "../app/store";
import {useCurrentGameWebSocket, useGameWebSocket} from "../app/WebSocket";
import { attachPlayerList } from "../features/player/PlayerListSlice";
import { useEffect } from "react";
import RoleCard from "./RoleCard";
import Button from "./mini-components/Button";



export default function GameRoom() {
  const player = useSelector((state:RootState)=>state.player);
  const playerList = useSelector((state:RootState)=>state.playerListInGame);
  const dispatch = useDispatch();
  useGameWebSocket(player.id ?? null);
  useCurrentGameWebSocket(player.game?.id ?? null);

  

  
  useEffect(()=>{
    async function getPlayerList() 
    {
      const response = await axios.post("http://localhost:8080/player/" + player.game?.id + "/playerList");
      
      dispatch(attachPlayerList(response.data));
    }
    getPlayerList();
  }, []);

  async function changeGameStatus()
  {
    const response = await axios.post("http://localhost:8080/game/update/" + player.game?.id);
    console.error(response.data);
    
  }
  
  return (
    <div className="flex justify-center items-center flex-col">
        <h1 className="text-2xl text-white/80 font-bold m-auto">Game Room: {player.game?.id}</h1>
        <h1 className="text-3xl text-white font-bold m-auto">Category: {player.game?.category}</h1>
        
        
        <h1 className="text-2xl text-white/80 font-bold m-auto">{playerList.length} Players in room</h1>

      {player.game?.status == "ROLE" ? (<RoleCard isImposter={player.game?.imposterId == player.id} />) : (<></>)}
      {player.id == null || player.game == null || player.game.status !== "LOBBY" ? (<></>) : (<table className=" bg-white m-auto mt-10 p-10 rounded-xl overflow-hidden">
      
      
      
      {/* Player List Table */}
      <thead className="bg-blue-700 text-white font-bold">
        <tr className="p-10 ">
          <td className="p-2 w-25">Player</td>
          <td className="p-2 w-25">ID</td>
        </tr>
      </thead>
      <tbody>
        {
          playerList.map((player)=>(
          <tr className=" bg-blue-300">
            <td className="p-2 w-25">{player.name}</td>
            <td className="p-2 w-25">{player.id}</td>
          </tr>
          )) 
        }
        
      </tbody>
    </table>)}

    {/* <Button onClick={changeGameStatus()} bgColor="bg-green-700/70" borderColor="white" bgHoverColor="hover:bg-white" borderHoverColor="hover:border-green-700" textColor="text-white" textHoverColor="hover:text-green-500"></Button> */}
    <button onClick={()=>changeGameStatus()} className="flex flex-row justify-center items-center text-white hover:cursor-pointer hover:bg-white hover:border-green-700 hover:border-solid border-2 hover:text-green-500 transition-all duration-300 m-auto mt-3 px-5 p-3 bg-green-700/70 rounded-full">Start Game</button>
    </div>
  )
}
