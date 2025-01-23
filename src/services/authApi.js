import axios from "axios";

const API_BASE_URL = "https://ads.planetmedia.app/";
const API_KEY = `99e49c73-877b-47ae-ae80-be1c88ca36f7`;
// Create an Axios instance
const authApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
    },
});

export default authApi;
