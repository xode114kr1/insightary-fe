import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
