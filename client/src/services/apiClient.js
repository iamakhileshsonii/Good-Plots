import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios instance
export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // To send cookies if needed
});

// Add an interceptor to include the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const authToken = JSON.parse(localStorage.getItem("goodPlots-auth"));
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
