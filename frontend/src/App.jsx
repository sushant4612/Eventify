import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Event from './pages/Event'

const App = () => {
  return (
    <div className='w-full h-screen bg-black text-white px-4 fixed sm:px-[5vw] md:px-[7vw] lg:px-[9vw'>
       <ToastContainer/>
      <Navbar />
      <Routes> 
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<Event />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App