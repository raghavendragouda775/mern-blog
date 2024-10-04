import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import About from './pages/about'
import Header from './components/Header'
function App() {
  return (
    <BrowserRouter>
   <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Sign-in' element={<Signin/>}/>
      <Route path='/Sign-up' element={<SignUp/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/projects' element={<Projects/>}/>

      
    </Routes>
    </BrowserRouter>
  )
}

export default App
