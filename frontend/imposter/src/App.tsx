import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import GameRoom from './components/GameRoom'
import Lobby from './components/Lobby'
import CreateGame from './components/CreateGame';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Lobby} />

        <Route path='/Game' Component={GameRoom} />
        <Route path='/CreateGame' Component={CreateGame} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
