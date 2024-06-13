import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
const PlanContext = createContext();

export const usePlan = () => useContext(PlanContext);

export const PlanProvider = ({ children }) => {
    const [plan, setPlan] = useState([]);

    const fetchPlan = async () => {
        const token = Cookies.get('token');
        try {
            const response = await axios.get('http://localhost:8000/plan/get-plan', {
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