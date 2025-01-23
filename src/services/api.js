import axios from "axios";

const API_BASE_URL = "https://ads.planetmedia.app/";
const API_KEY = `99e49c73-877b-47ae-ae80-be1c88ca36f7`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
