import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Publiclayout = ({ children }) => {
    const [showContent, setShowContent] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token")
        if (token) {
            navigate("/");
        }else{
            setShowContent(true);
        }
    }, []);

    return  showContent && <div>{children}</div>;
};

export default Publiclayout;
