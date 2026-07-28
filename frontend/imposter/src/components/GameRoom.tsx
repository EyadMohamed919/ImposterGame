import { useSelector } from "react-redux";
import axios from "axios";
import type { RootState } from "../app/store";
import {useCurrentGameWebSocket} from "../app/WebSocket";


export default function GameRoom() {
  const player = useSelector((state:RootState)=>state.player);
  const playerList = useSelector((state:RootState)=>state.playerListInGame);
  useCurrentGameWebSocket(player.game?.id ?? null)
  console.log(player);
  
  return (
    <div className="flex justify-center items-center flex-col">
        <h1 className="text-2xl text-white/80 font-bold m-auto">Game Room: {player.game?.id}</h1>
        <h1 className="text-3xl text-white font-bold m-auto">Category: {player.game?.category}</h1>

        {player.id == null && player.game == null ? (<></>) : (<table className=" bg-white m-auto mt-10 p-10 rounded-xl overflow-hidden">
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
    </div>
  )
}
