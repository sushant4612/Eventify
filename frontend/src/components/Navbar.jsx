import React, { useContext, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { EventContext } from '../context/EventContext'

const Navbar = () => {
  const {token, setToken} = useContext(EventContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className='w-full h-16 flex items-center justify-between'>
        <Link to='/' className='text-2xl font-mono'>Eevn<span className='text-red-500 font-mono'>tify</span></Link> 
        <div className='flex items-center gap-4'>
            <NavLink to='/' className='group'>
                Home
                <div className='w-full h-[2px] bg-red-500 hidden group-hover:block'></div>
            </NavLink>
            <NavLink to='/events' className='group'>
                Events
                <div className='w-full h-[2px] bg-red-500 hidden group-hover:block'></div>
            </NavLink>
            {token ? (<button onClick={handleLogout} className='bg-red-700 w-24 text-white px-4 hover:bg-red-500 py-2 rounded-md'>Logout</button>) : (<button onClick={() => navigate('/login')} className='bg-red-700 w-24 text-white px-4 hover:bg-red-500 py-2 rounded-md'>Login</button>)}
        </div>
    </div>
  )
}

export default Navbar