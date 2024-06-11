import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const token = Cookies.get('token');
            try {
                const response = await axios.get('https://backendcapwedplanappevent-9.onrender.com/api/bookings', {
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
