import { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useJwt } from "react-jwt";
import { fetchCurrentUser } from "../Utilfiles/authUtil";
import Cookies from "js-cookie";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  token: {},
  user: null,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const token = Cookies.get('token');
  const { decodedToken, isExpired } = useJwt(token || "");

  useEffect(() => {
    const getCurrentUser = async () => {
      if (decodedToken && !isExpired) {
        setIsLoggedIn(true);
        try {
          const currentUser = await fetchCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error("Failed to fetch current user", error);
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    getCurrentUser();
  }, [decodedToken, isExpired]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token: decodedToken,
        user,
        isAdmin: user?.isAdmin || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
