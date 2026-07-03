import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import CreatePlayer from './components/CreatePlayer'
import Lobby from './components/Lobby'
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Lobby} />

        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
