import Cookies from 'js-cookie';

export const fetchCurrentUser = async () => {
    const token = Cookies.get('token');
    if (!token) {
        console.error("No token found in cookies");
        return null;
    }

    try {
        const response = await fetch('https://backendcapwedplanappevent.onrender.com/auth/current-user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });

        const data = await response.json();
        if (response.ok) {
            return data.data
            
        } else {
            console.log("Failed to fetch user:", data.message);
        }
    } catch (error) {
        console.log("Error fetching current user:", error);
        return null;
    }
};
