import { useSelector } from "react-redux";
import axios from "axios";
import type { RootState } from "../app/store";
import {useCurrentGameWebSocket} from "../app/WebSocket";
export default function GameRoom() {
  const player = useSelector((state:RootState)=>state.player);

//   const playerList = 
  useCurrentGameWebSocket(player.game.id ?? null)
  return (
    <div className="flex justify-center items-center flex-col">
        <h1 className="text-2xl text-white/80 font-bold m-auto">Game Room: {player.game?.id}</h1>
        <h1 className="text-3xl text-white font-bold m-auto">Category: {player.game?.category}</h1>

        {player.id == null && player.game == null ? (<></>) : (<table className=" bg-white m-auto mt-10 p-10 rounded-xl overflow-hidden">
      <thead className="bg-blue-700 text-white font-bold">
        <tr className="p-10 ">
          <td className="p-2 w-25">Game</td>
          <td className="p-2 w-25">Category</td>
          <td className="p-2 w-25">Status</td>
          <td className="p-2 w-25">Join</td>
        </tr>
      </thead>
      <tbody>
        {
          gamesList.map((game)=>(
          <tr className=" bg-blue-300">
            <td className="p-2 w-25">{game.id}</td>
            <td className="p-2 w-25">{game.category}</td>
            <td className="p-2 w-25"><p className="flex justify-center items-center bg-green-700 text-white p-2 whitespace-nowrap rounded-full">{game.status}</p></td>
            
            {game.status != "LOBBY" ? (<td className='p-2 w-25' ><p className="cursor-not-allowed flex justify-center items-center bg-green-700/60 text-white p-2 whitespace-nowrap rounded-full">Join</p></td>) 
            : (<td className='p-2 w-25' ><p onClick={()=>assignGameToPlayer(player.id, game.id)} className="flex justify-center items-center bg-green-700 text-white p-2 whitespace-nowrap rounded-full">Join</p></td>)}
            
          </tr>
          ))
        }
        {/* <tr className=" bg-blue-300">
          
        </tr> */}
      </tbody>
    </table>)}
    </div>
  )
}
