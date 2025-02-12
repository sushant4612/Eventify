import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    // Fetch all events
    const getAllEvents = async () => {
        try {
            const response = await axios.get(`${apiUrl}/events`);
            setEvents(response.data.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    // Fetch event by ID
    const getEventById = async (eventId) => {
        try {
            const response = await axios.get(`${apiUrl}/events/${eventId}`);
            setSelectedEvent(response.data.data);
        } catch (error) {
            console.error("Error fetching event details:", error);
        }
    };

    const createEvent = async (eventData) => {
        try { 
            const response = await axios.post(`${apiUrl}/events/create`, eventData, {
                headers: { Authorization: `${token}` },
            });
    
            if (response.data.success) {
                getAllEvents();
            }
    
            return response.data; 
        } catch (error) {
            console.error("Error creating event:", error);
            throw error;
        }
    };
    

    // Update an event
    const updateEvent = async (eventId, eventData) => {
        try {
            const formData = new FormData();
            Object.keys(eventData).forEach((key) => {
                formData.append(key, eventData[key]);
            });

            const response = await axios.put(`${apiUrl}/events/${eventId}`, formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                getAllEvents(); // Refresh events list
                navigate(`/events/${eventId}`);
            }
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    // Delete an event
    const deleteEvent = async (eventId) => {
        try {
            await axios.delete(`${apiUrl}/events/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            getAllEvents(); // Refresh events list
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    // Book a ticket for an event
    const bookTicket = async (eventId) => {
        try {
            await axios.post(`${apiUrl}/events/${eventId}/book`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            getAllEvents(); // Refresh events list
        } catch (error) {
            console.error("Error booking ticket:", error);
        }
    };

    // Cancel a booked ticket
    const cancelTicket = async (eventId) => {
        try {
            await axios.post(`${apiUrl}/events/${eventId}/cancel`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            getAllEvents(); // Refresh events list
        } catch (error) {
            console.error("Error canceling ticket:", error);
        }
    };

    // Get all events created by the logged-in user
    const getMyEvents = async () => {
        try {
            const response = await axios.get(`${apiUrl}/events/my-events`, {
                headers: { Authorization: `${token}` },
            });
            setEvents(response.data.data);
        } catch (error) {
            console.error("Error fetching my events:", error);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!token && storedToken) {
            setToken(storedToken);
        }
    }, [token]);

    return (
        <EventContext.Provider
            value={{
                token,
                setToken,
                events,
                selectedEvent,
                getAllEvents,
                getEventById,
                createEvent,
                updateEvent,
                deleteEvent,
                bookTicket,
                cancelTicket,
                getMyEvents,
                navigate
            }}
        >
            {children}
        </EventContext.Provider>
    );
};

export default EventProvider;