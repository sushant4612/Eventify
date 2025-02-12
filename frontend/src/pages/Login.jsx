import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { EventContext } from '../context/EventContext';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {navigate, setToken} = useContext(EventContext);
  const login = async (formData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
      console.log(response.data.data);
      
      const token = response.data.data;
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/');
      toast.success('Login successful');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const signup = async (formData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
      const token = response.data.data;
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/');
      toast.success('Signup successful');
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { username, password, email };
    if(currentState === 'Login'){
      login(formData);
    }else{
      signup(formData);
    }
    console.log('Form submitted:', formData);
  };

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/');
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleSubmit}
          className="bg-gray-900 rounded-lg shadow-xl p-8 space-y-6"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {currentState}
            </h1>
            <div className="h-1 w-16 bg-red-600 mx-auto rounded"/>
          </div>

          {currentState === 'Sign Up' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                placeholder="Enter your username"
                required
              />
            </div>
          )}

          {currentState === 'Sign Up' && (
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                Email
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                placeholder="Enter your email"
                required
                />
            </div>
          )}

          {currentState === 'Login' && (
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                Email
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
                placeholder="Enter your email"
                required
                />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <button type="button" className="hover:text-red-500 transition">
              Forgot password?
            </button>
            <button 
              type="button"
              onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
              className="hover:text-red-500 transition"
            >
              {currentState === 'Login' ? 'Create account' : 'Login here'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;