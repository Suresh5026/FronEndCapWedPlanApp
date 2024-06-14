import React, { createContext, useContext, useState } from 'react';

import axios from 'axios';
const DecoContext = createContext();

export const useDeco = () => useContext(DecoContext);

export const DecoProvider = ({ children }) => {
    const [deco, setDeco] = useState([]);

    const fetchDeco = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('https://backendcapwedplanappevent.onrender.comdecorate/get-decoration', {
                method:'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials:true
            });
            setDeco(response.data.data);
        } catch (error) {
            console.error('There was an error fetching the deco!', error);
        }
    };

    return (
        <DecoContext.Provider value={{ deco, fetchDeco }}>
            {children}
        </DecoContext.Provider>
    );
};