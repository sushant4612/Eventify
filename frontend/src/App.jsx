import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Event from './pages/Event'
import CreateEvent from './pages/CreateEvent'
import EventDetails from './pages/EventDetails'
import MyEvents from './pages/MyEvents'

const App = () => {
  return (
    <div className='w-full h-screen text-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw'>
      <ToastContainer/>
      <Navbar />
      <Routes> 
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<Event />} />
        <Route path='/events/:id' element={<EventDetails />} />
        <Route path='/my-events' element={<MyEvents />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<CreateEvent />} />
      </Routes>
    </div>
  )
}

export default App