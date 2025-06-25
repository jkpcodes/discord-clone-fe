import axios from "axios";
import { setAlert } from "../store/alertSlice";
import store from "../store";
import { logoutHandler } from "./auth";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 15000,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const { token } = JSON.parse(userDetails);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    store.dispatch(setAlert({
      open: true,
      message: error.response?.data?.message || error.message,
      severity: "error",
      vertical: "top",
      horizontal: "center",
    }));

    if (error.response?.status === 401 || error.response?.status === 403) {
      logoutHandler();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
