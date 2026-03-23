// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // ❌ Remove withCredentials if you're using JWT in localStorage
  // ✅ Only keep it if your backend uses httpOnly cookies
  // withCredentials: true,
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
        localStorage.removeItem("token");  // ✅ clear expired token
        localStorage.removeItem("user");   // ✅ clear user data

        window.location.href = "/login";   // ✅ redirect to login (uncommented)
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;