import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

const Privatelayout = ({ children }) => {
    const [showContent,setShowContent] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/login");
        }else{
            setShowContent(true)
        }
    }, []);

    return showContent && <div>{children}</div>;
};

export default Privatelayout;
