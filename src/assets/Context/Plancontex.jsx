import React, { createContext, useContext, useState } from 'react';

import axios from 'axios';
const PlanContext = createContext();

export const usePlan = () => useContext(PlanContext);

export const PlanProvider = ({ children }) => {
    const [plan, setPlan] = useState([]);

    const fetchPlan = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('https://backendcapwedplanappevent.onrender.com/plan/get-plan', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPlan(response.data.data);
        } catch (error) {
            console.error('There was an error fetching the plan!', error);
        }
    };

    return (
        <PlanContext.Provider value={{ plan, fetchPlan }}>
            {children}
        </PlanContext.Provider>
    );
};