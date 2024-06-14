import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Publiclayout = ({ children }) => {
    const [showContent, setShowContent] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            navigate("/");
        }else{
            setShowContent(true);
        }
    }, []);

    return  showContent && <div>{children}</div>;
};

export default Publiclayout;
