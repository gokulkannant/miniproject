import { useState } from 'react'
import Exam from './Exam'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import CollegePlan from './CollegePlan'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/home' element={<Home /> }></Route>
        <Route path='/exam' element={<Exam /> }></Route>
        <Route path='/signup' element={<Signup /> }></Route>
        <Route path='/login' element={<Login /> }></Route>
        <Route path='/collegeplan' element={<CollegePlan /> }></Route>

        
      </Routes>
    </BrowserRouter>
  )
}

export default App
