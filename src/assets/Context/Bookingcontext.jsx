import React, { createContext, useContext, useState, useEffect } from 'react';

import axios from 'axios';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('https://backendcapwedplanappevent.onrender.combookings', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBookings(response.data.data);
            } catch (error) {
                console.error('There was an error fetching the bookings!', error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <BookingContext.Provider value={{ bookings }}>
            {children}
        </BookingContext.Provider>
    );
};
