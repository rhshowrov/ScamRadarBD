// api/api.js
import axios from "axios";
import { ACCESS_TOKEN } from "./constant";

let storeInstance = null;

export const injectStore = (_store) => {
  storeInstance = _store;
};

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token expired. Logging out...");
      if (storeInstance) {
        storeInstance.dispatch({ type: "auth/logOut" }); // avoid importing slice
      }
    }
    return Promise.reject(error);
  }
);

export default api;
