import { useState } from 'react'
import Home from './Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home /> }></Route>
        <Route path='/signup' element={<Signup /> }></Route>
        <Route path='/login' element={<Login /> }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
