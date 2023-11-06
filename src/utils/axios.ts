import axios from "axios";


const API = axios.create({
    baseURL: "http://20.255.52.88/api",
})


API.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default API;