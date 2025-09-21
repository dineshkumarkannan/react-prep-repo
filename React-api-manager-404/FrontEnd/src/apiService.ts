import axios from "axios";
import { logout } from "./store/features/Auth/authSlice"; // adjust to your auth slice

let storeRef: any;

export const injectStore = (_store: any) => {
  storeRef = _store;
};

const api = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = storeRef?.getState()?.auth?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      if (response.status === 401 || response.status === 403) {
        // Option 1: redirect using window.location
        window.location.href = "/login";
        // Option 2: (advanced) create a custom history object and push "/login"
      }

      if (response.status === 404) {
        // Redirect to login if your backend uses 404 for invalid/expired session
        window.location.href = "/login";
      }
    }
    localStorage.clear();
    return Promise.reject(error);
  }
);

export default api;
