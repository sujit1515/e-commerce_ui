
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-commerce-backend-b9ku.onrender.com/api/v1"
});

// ✅ REQUEST INTERCEPTOR — attaches token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR — handles token expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");  
        localStorage.removeItem("user");   

        window.location.href = "/login";   
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;