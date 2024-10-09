import React from 'react'
import 'flowbite/dist/flowbite.min.css';

import { BrowserRouter } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import About from './pages/about'
import Header from './components/Header'
import Footercomp from './components/Footer'
import PrivateAuth from './components/privateAuth'
import OnlyAdminPrivate from './components/OnlyAdminPrivate';
import CreatePost from './pages/CreatePost';
function App() {
  return (
    <BrowserRouter>
   <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Sign-in' element={<SignIn/>}/>
      <Route path='/Sign-up' element={<SignUp/>}/>
      <Route path='/about' element={<About/>}/>
      <Route element={<PrivateAuth/>}>

      <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>
      <Route element={<OnlyAdminPrivate/>}>

      <Route path='/create-post' element={<CreatePost/>}/>
      </Route>
      <Route path='/projects' element={<Projects/>}/>

      
    </Routes>
    <Footercomp/>
    </BrowserRouter>
  )
}

export default App
