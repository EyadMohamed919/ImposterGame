import { useState } from "react";
import axios from "axios";
import {useSelector, useDispatch } from "react-redux";
import { attachPlayer, detachPlayer, type game } from "../features/player/PlayerSlice";
import type { RootState } from '../app/store';
import { MdDelete } from "react-icons/md";
import CreateGame from "./CreateGame";
import { IoGameController } from "react-icons/io5";


function CreatePlayer() {

    const [name, setName] = useState<string>("");
    const [showCreateGame, setShowCreateGame] = useState<boolean>(false);

    const dispatch = useDispatch();
    const player = useSelector((state:RootState)=>state.player)

    async function assignGame(game: game) 
    {
        const updatedPlayer = {
            ...player,
            game: game
        };
        
        dispatch(attachPlayer(updatedPlayer));
    }
    
    async function sendPlayer()
    {
        if(name != "")
        {
            const randomPic = await axios.get("https://picsum.photos/200");
            const picURL =  randomPic.request.res?.responseUrl || randomPic.request.responseURL;
            
            const response = await axios.post("http://localhost:8080/player", {
                "name":name,
                "picURL":picURL
            });
            dispatch(attachPlayer(response.data));
        }
    }

    async function removedPlayer() {
        if(player.id != null)
        {
            dispatch(detachPlayer());
            const response = await axios.delete("http://localhost:8080/player", {data:player});
        }
    }

    return ( 
        <div className="h-fit w-fit m-auto flex justify-center items-center flex-col">
            <img src={player.profilePic} alt="" className="w-30 mb-5 rounded-2xl" />
            {player.id == null ? (<p className="text-xl text-white/50">Create your player</p>) : (<p className="text-xl text-white/50">Welcome back, {player.name}</p>)}
            
            <h1 className="text-2xl font-bold text-white">Welcome to Imposter</h1>
            

            
            <div className="flex flex-row justify-center items-center">
            {player.id == null ? (<>
            <input onChange={(e)=>setName(e.target.value)} type="text" className="m-auto mt-3 mr-2 p-3 text-white bg-blue-500/30  rounded-xl" placeholder="Enter your name" />
            <button onClick={()=>sendPlayer()} className="hover:cursor-pointer hover:bg-white transition-all duration-300 m-auto mt-3 px-5 p-3 bg-blue-500/70 rounded-full">Create</button>
            </>) : (
                <>
                {showCreateGame ? (<></>):(<button onClick={()=>setShowCreateGame(!showCreateGame)} className="ml-1 mr-1 flex flex-row justify-center items-center text-white hover:cursor-pointer hover:bg-white hover:text-green-700 transition-all duration-300 m-auto mt-3 px-5 p-3 bg-green-700/70 rounded-full"><IoGameController className="mr-1" /> Create Game</button>)}
                <button onClick={()=>removedPlayer()} className="ml-1 mr-1 flex flex-row justify-center items-center text-white hover:cursor-pointer hover:bg-white hover:text-red-500 transition-all duration-300 m-auto mt-3 px-5 p-3 bg-red-500/70 rounded-full"><MdDelete className="mr-1" /> Delete Player</button>
                </>
                )}
            </div>

            {showCreateGame ? (<CreateGame joinGame={assignGame}  />): (<></>)}
            
        </div>
     );
}

export default CreatePlayer;