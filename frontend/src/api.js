import axios from "axios";

// This looks for a variable named VITE_API_URL. 
// If it doesn't find it, it defaults to localhost for your local testing.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Attach token automatically to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;