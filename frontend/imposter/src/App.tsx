import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import GameRoom from './components/GameRoom'
import Lobby from './components/Lobby'
import DynamicBackground from './app/DynamicBackground';
import { useSelector, useDispatch } from "react-redux";
import {attachPlatform} from "./features/platform/platformSlice";
import type { RootState } from "./app/store";

function App() {
  const platform = useSelector((state:RootState)=>state.platform);
  const dispatch = useDispatch();
  const body = document.body;
  if(platform.color)
  {
    body.style.background = "linear-gradient(180deg, black, " + platform.color + ")";
  }
  else
  {
    const r = Math.floor(Math.random() * 256); // Random between 0-255
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    const newColor:string = `rgb(${r}, ${g}, ${b})`;
    body.style.background = "linear-gradient(180deg, black, " + newColor + ")";
    dispatch(attachPlatform({color:newColor}));
  }
  return (
    <>
    <DynamicBackground />
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Lobby} />

        <Route path='/Game' Component={GameRoom} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
