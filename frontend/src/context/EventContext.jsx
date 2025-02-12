import { createContext, useState } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <EventContext.Provider value={{token, setToken}}>
            {children}
        </EventContext.Provider>
    )
}