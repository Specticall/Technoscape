import axios from "axios";
import { BASE_URL } from "../../utils/config";

export const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");

    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
