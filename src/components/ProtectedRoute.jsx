import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api.js";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

//Wrapper component to protect pages that require authentication
function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null); 

    useEffect(() => { 
        auth().catch((err) => {
            console.error("Auth check failed:", err);
            setIsAuthorized(false);
        });
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) return false;

        try {
            const response = await api.post("/api/token/refresh/", { refresh: refreshToken });
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthorized(true);
                return true;
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
        }
        setIsAuthorized(false);
        return false;
    };

    const auth = async () => {
        const refresh = localStorage.getItem(REFRESH_TOKEN);
        if (!refresh) {
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(refresh);
        const refreshExp = decoded.exp;
        const currentTime = Date.now() / 1000;

        if (refreshExp > currentTime) {
            await refreshToken();
        } else {
            setIsAuthorized(false);
        }
    };

    if (isAuthorized === null) {
        return <h1>Loading...</h1>; 
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;