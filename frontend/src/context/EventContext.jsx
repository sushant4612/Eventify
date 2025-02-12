import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    const [events, setEvents] = useState([])

    const getAllEvents = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`)
        setEvents(response.data.data)
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!token && storedToken) {
          setToken(storedToken);
        }
    }, [token]);

    return (
        <EventContext.Provider value={{token, setToken, events, getAllEvents, navigate}}>
            {children}
        </EventContext.Provider>
    )
}