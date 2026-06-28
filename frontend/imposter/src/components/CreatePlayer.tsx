import { useState } from "react";
import axios from "axios";
function CreatePlayer() {

    const [name, setName] = useState<string>("");

    function sendPlayer()
    {
        if(name != "")
        {
            const response = axios.post("localhost:8080/")
        }
    }

    return ( 
        <div className="h-fit w-fit m-auto flex justify-center items-center flex-col">
            <h1 className="text-2xl font-bold text-white">Welcome to Imposter</h1>
            <p className="text-xl text-white/50">Create your player</p>

            <input onChange={(e)=>setName(e.target.value)} type="text" className="m-auto mt-3 p-3 text-white bg-blue-500/30  rounded-xl" placeholder="Enter your name" />
            <button onClick={()=>sendPlayer()} className="m-auto mt-3 px-5 p-3 bg-blue-500/70 rounded-full">Create</button>
        </div>
     );
}

export default CreatePlayer;