import axios from "axios";

const api = axios.create({
   // changed to import.meta
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
    timeout: 60000, 
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Session expired or unauthorized. Wiping local credentials.");
            localStorage.removeItem("token");
            
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);


export default api;