import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "https://tomatoes-distribution-app.onrender.com/api",
  timeout: 60000, // 60 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Session Expiration & Auth Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    // Ignore 401s on auth routes so components can display inline error messages (e.g. "Wrong password")
    const isAuthEndpoint = requestUrl.includes("/auth/");

    if (status === 401 && !isAuthEndpoint) {
      console.warn("Session expired. Clearing credentials.");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const authPages = ["/login", "/signup", "/forgot-password"];
      if (!authPages.includes(window.location.pathname)) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;