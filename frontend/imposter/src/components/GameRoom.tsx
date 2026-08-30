import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import type { RootState } from "../app/store";
import {useCurrentGameWebSocket, useGameWebSocket} from "../app/WebSocket";
import { attachPlayerList } from "../features/player/PlayerListSlice";
import { useEffect, useState } from "react";
import RoleCard from "./RoleCard";
import Button from "./mini-components/Button";
import { attachPlayer } from "../features/player/PlayerSlice";
import { useNavigate } from "react-router-dom";



export default function GameRoom() {
  const player = useSelector((state:RootState)=>state.player);
  const playerList = useSelector((state:RootState)=>state.playerListInGame);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timerDisplay, setTimerDisplay] = useState("00:00");
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(10);
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

  async function exitGame()
  {
    const response = await axios.post("http://localhost:8080/player/" + player.id + "/game/" + player.game?.id + "/unassign");
    
    if(response.status == 200)
    {
      const updatedPlayer = {
              ...player,
              game: null,
              imposter:false,
              votesOn:0,
              voted:false,
            };
  
      dispatch(attachPlayer(updatedPlayer));
      navigate("/");
    }
  }

  async function vote(playerID:number)
  {
    const response = await axios.post("http://localhost:8080/player/" + player.id + "/voteOn/" + playerID);
    console.log(response.data);
     if(response.data)
    {
      const updatedPlayer = {
              ...player,
              voted:true,
            };
  
      dispatch(attachPlayer(updatedPlayer));
    }

  }

  async function changeGameStatus()
  {
    const response = await axios.post("http://localhost:8080/game/update/" + player.game?.id);
    console.error(response.data);
  }

  async function changeGameStatusToVoting()
  {
    const response = await axios.post("http://localhost:8080/game/update/" + player.game?.id + "/voting");
    console.log(response.data);
  }


  useEffect(() => {
    if (player.game?.status !== "ONGOING") return;

    if (timeLeftInSeconds <= 0) {
      changeGameStatusToVoting();
      return;
    }

    const minutes = Math.floor(timeLeftInSeconds / 60);
    const seconds = timeLeftInSeconds % 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    setTimerDisplay(minutes + ":" + formattedSeconds);

    const timer = setTimeout(() => {
      setTimeLeftInSeconds((prev) => {
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timer);

  }, [timeLeftInSeconds, player.game?.status]);
  
  
  return (
    <div className="flex justify-center items-center flex-col">
        <h1 className="text-2xl text-white/80 font-bold m-auto">Game Room: {player.game?.id}</h1>
        <h1 className="text-3xl text-white font-bold m-auto">Category: {player.game?.category}</h1>
        
        
        <h1 className="text-2xl text-white/80 font-bold m-auto">{playerList.length} Players in room</h1>

      {player.game?.status == "ROLES" ? (<RoleCard word={player.game.topic} isImposter={player.game?.imposterId == player.id} />) : (<></>)}

      {player.game?.status == "ONGOING" ? (<p className="p-7 bg-white font-bold text-3xl text-blue-600 pr-15 pl-15 rounded-full m-auto mt-5 mb-5">{timerDisplay}</p>):(<></>)}


      {/* Player List Table */}
      {player.id == null || player.game == null || player.game.status !== "LOBBY" && player.game.status !== "VOTING" ? (<></>) : (<table className=" bg-white m-auto mt-10 p-10 rounded-xl overflow-hidden">
      <thead className="bg-blue-700 text-white font-bold">
        <tr className="p-10 ">
          <td className="p-2 w-25">Player</td>
          <td className="p-2 w-25">ID</td>
          {player.game?.status == "VOTING" ? (<td className="p-2 w-25">Votes On</td>):(<></>)}
          {player.game?.status == "VOTING" ? (<td className="p-2 w-25">Vote</td>):(<></>)}
        </tr>
      </thead>
      
      <tbody>
        {
          playerList.map((playerRow)=>(
          <tr className=" bg-blue-300">
            <td className="p-2 w-25">{playerRow.name}</td>
            <td className="p-2 w-25">{playerRow.id}</td>
            {player.game?.status == "VOTING" ? (<td className="p-2 w-25">{playerRow.votesOn}</td>):(<></>)}
            {player.game?.status == "VOTING" ? (
              <td className="p-2 w-25 flex justify-center items-center">
                {player.id != playerRow.id || player.voted ? (<button onClick={()=>vote(player.id ?? 0)} className="default-button-green">Vote</button>):(<button onClick={()=>vote(player.id ?? 0)} disabled className="default-button-green-disabled">Vote</button>)}
                
                </td>
              ):(<></>)}
          </tr>
          )) 
        }
        
      </tbody>
    </table>)}

    {/* <Button onClick={changeGameStatus()} bgColor="bg-green-700/70" borderColor="white" bgHoverColor="hover:bg-white" borderHoverColor="hover:border-green-700" textColor="text-white" textHoverColor="hover:text-green-500"></Button> */}
    
    <div className="flex-row flex justify-center items-center">
      {player.game?.status == "ONGOING" ? (<></>):(<button onClick={()=>changeGameStatus()} className="default-button-green">{player.game?.status == "FINISHED" ? (<>Restart</>):(<>Start Game</>)}</button>)}
      <button onClick={()=>exitGame()} className="default-button-red">Exit</button>
    </div>
    
    
    </div>
  )
}
