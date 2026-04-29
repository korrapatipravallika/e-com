import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
});

export const dummyJsonClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

export default axiosInstance;
