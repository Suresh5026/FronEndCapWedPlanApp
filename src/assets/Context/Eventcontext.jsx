import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
const EventContext = createContext();

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get('https://backendcapwedplanappevent.onrender.com/events/get-events', {
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