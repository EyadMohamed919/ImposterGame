import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import CreatePlayer from "./CreatePlayer";
import { useGameWebSocket } from "../app/WebSocket";
import axios from "axios";
import { attachGamesList } from "../features/game/GamesSlice";
import { useState } from "react";

function Lobby() {

  const player = useSelector((state:RootState)=>state.player);
  const dispatch = useDispatch();
  const [requested, setRequested] = useState(false);
  const gamesList = useSelector((state:RootState)=>state.games);
  
  useGameWebSocket(player.id ?? null);
  async function getGameList() {
  
    if(player.id != null && !requested)
    {
      console.log("requested game list");
      
      const response = await axios.get("http://localhost:8080/game");
      dispatch(attachGamesList(response.data));
      setRequested(true);
    }
  }

  getGameList();

  return (
    <>
    <CreatePlayer/>
    {player.id == null ? (<></>) : (<table className=" bg-white m-auto mt-10 p-10 rounded-xl overflow-hidden">
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
            <td className="p-2 w-25"><p className="flex justify-center items-center bg-green-700 text-white p-2 whitespace-nowrap rounded-full">Not Started</p></td>
            <td className="p-2 w-25"><p className="flex justify-center items-center bg-green-700 text-white p-2 whitespace-nowrap rounded-full">Join</p></td>
          </tr>
          ))
        }
        {/* <tr className=" bg-blue-300">
          
        </tr> */}
      </tbody>
    </table>)}
    
    </>
  )
}

export default Lobby