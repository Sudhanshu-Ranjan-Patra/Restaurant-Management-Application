import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1",
  withCredentials: true,
});

// Simple helper to read a cookie by name
export function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(^|; )" + name.replace(/([.*+?^${}()|[\\]\\\\])/g, "\\$1") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[2]) : null;
}

// Attach token automatically from cookie
API.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear cookie (client-side)
      if (typeof document !== "undefined") {
        document.cookie = "token=; path=/; max-age=0";
      }
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;

