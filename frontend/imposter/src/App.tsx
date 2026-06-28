import { useState } from 'react'

import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import CreatePlayer from './components/CreatePlayer'
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={CreatePlayer} />

        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
