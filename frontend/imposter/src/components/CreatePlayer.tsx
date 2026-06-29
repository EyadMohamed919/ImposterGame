import { useState } from "react";
import axios from "axios";
import {useSelector, useDispatch } from "react-redux";
import { attachPlayer, detachPlayer } from "../features/player/PlayerSlice";
import type { RootState } from '../app/store';

function CreatePlayer() {

    const [name, setName] = useState<string>("");
    const dispatch = useDispatch();
    const player = useSelector((state:RootState)=>state.player)
    async function sendPlayer()
    {
        if(name != "")
        {
            const response = await axios.post("http://localhost:8080/player", {
                "name":name
            });
            dispatch(attachPlayer(response.data));
        }
    }

    async function removedPlayer() {
        if(player.id != null)
        {
            const response = await axios.delete("http://localhost:8080/player", {data:player});
            if(response.data == true)
            {
                dispatch(detachPlayer())
            }
        }
    }

    return ( 
        <div className="h-fit w-fit m-auto flex justify-center items-center flex-col">
            {player.id == null ? (<p className="text-xl text-white/50">Create your player</p>) : (<p className="text-xl text-white/50">Welcome back, {player.name}</p>)}
            <h1 className="text-2xl font-bold text-white">Welcome to Imposter</h1>
            

            <input onChange={(e)=>setName(e.target.value)} type="text" className="m-auto mt-3 p-3 text-white bg-blue-500/30  rounded-xl" placeholder="Enter your name" />
            
            {player.id == null ? (<button onClick={()=>sendPlayer()} className="hover:cursor-pointer hover:bg-white transition-all duration-300 m-auto mt-3 px-5 p-3 bg-blue-500/70 rounded-full">Create</button>) : (<button onClick={()=>removedPlayer()} className="hover:cursor-pointer hover:bg-white transition-all duration-300 m-auto mt-3 px-5 p-3 bg-red-500/70 rounded-full">Delete Player</button>)}
        </div>
     );
}

export default CreatePlayer;