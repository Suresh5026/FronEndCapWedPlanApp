import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
const EventContext = createContext();

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('https://backendcapwedplanappevent.onrender.comevents/get-events', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEvents(response.data.data);
        } catch (error) {
            console.error('There was an error fetching the events!', error);
        }
    };

    return (
        <EventContext.Provider value={{ events, fetchEvents }}>
            {children}
        </EventContext.Provider>
    );
};