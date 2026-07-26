import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import GameRoom from './components/GameRoom'
import Lobby from './components/Lobby'
function App() {

  return (
    <>
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
