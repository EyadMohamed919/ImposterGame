import axios from "axios";
import { useState } from "react";
import { IoGameController } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {type game} from "../features/player/PlayerSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

interface CreateGameProps {
    joinGame: (game: game) => void;
}
function CreateGame({joinGame}:CreateGameProps)
{
    
    const [category, setCategory] = useState("Movies");
    const player = useSelector((state:RootState)=>state.player);
    const navigate = useNavigate();
    async function sendCreateGame()
    {
        const response = await axios.post("http://localhost:8080/game/player/" + player.id, {
            "category":category
        });

        console.log(response.data);
        joinGame(response.data);
        navigate("/Game")
        
    }
    return(
        <div className="flex flex-col justify-center items-center p-5 bg-white rounded-xl">
            <h1 className="text-xl font-bold text-green-700 ">Create New Game</h1>
            <select onChange={(e)=>setCategory(e.target.value)} className="border-2 bordr-green-700 rounded-xl border-dashed p-2 font-bold text-green-700 mt-2">
                <option value="" disabled selected>Select Game Category</option>
                <option value="places">Places</option>
                <option value="animals">Animals</option>
                <option value="jobs">Jobs</option>
            </select>

            <button onClick={()=>sendCreateGame()} className="flex flex-row justify-center items-center text-white hover:cursor-pointer hover:bg-white hover:border-green-700 hover:border-solid border-2 hover:text-green-500 transition-all duration-300 m-auto mt-3 px-5 p-3 bg-green-700/70 rounded-full"><IoGameController className="mr-1" /> Create Game</button>
        </div>
    );
}

export default CreateGame;