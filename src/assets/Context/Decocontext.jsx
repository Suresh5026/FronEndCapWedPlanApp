import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
const DecoContext = createContext();

export const useDeco = () => useContext(DecoContext);

export const DecoProvider = ({ children }) => {
    const [deco, setDeco] = useState([]);

    const fetchDeco = async () => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get('https://backendcapwedplanappevent-9.onrender.com/decorate/get-decoration', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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