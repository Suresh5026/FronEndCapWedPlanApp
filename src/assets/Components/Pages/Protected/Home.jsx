import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Slides from "./Slides";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/auth/current-user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true 
                });
                const userData = response.data.data;
                // console.log(userData)
                setUser(userData);
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        };

        if (token) {
            fetchData();
        }
    }, []);

    return (
        <>
        <div className="welcome d-flex flex-column justify-content-center align-items-center">
                <h1>Wedding Planner App</h1>
                {user ? (
          <h2 style={{color:"green"}}>Welcome {user.name} !!!</h2>
        ) : (
          <Button variant="success" onClick={() => navigate("/login")}>Get started</Button>
        )}
                <div className="welcomeimg">
                <Slides />
                </div>
            </div>
            
        </>
    );
}