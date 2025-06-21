import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Lobby from './Lobby.jsx'
import LocalGame from './LocalGame.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Lobby/>}/>
      <Route path="/local" element={<LocalGame/>}/>
      <Route path='/room/:roomId' element={<App/>}/>
    </Routes>
  </BrowserRouter>
)
