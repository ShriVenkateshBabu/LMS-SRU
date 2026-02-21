import axios from "axios";

const api = axios.create({
    baseURL: "http://lms.test", // ✅ removed /api
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

/* Auto CSRF before requests */
api.interceptors.request.use(async (config) => {
    await axios.get("http://lms.test/sanctum/csrf-cookie", {
        withCredentials: true,
    });

    return config;
});

export default api;
