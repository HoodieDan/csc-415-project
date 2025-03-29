import axios from "axios";

const ApiClient = axios.create({
    baseURL: "https://csc-415-project.onrender.com/api/v1",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    },
    withCredentials: false,
});

// Add a request interceptor for handling common request configurations
ApiClient.interceptors.request.use(
    (config) => {
        // Get the token from localStorage if it exists
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Add a response interceptor for handling common responses and errors
ApiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common error scenarios
        if (error.response) {
            // Handle unauthorized access
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                // You can add additional logic here like redirecting to login
            }
        }
        return Promise.reject(error);
    },
);

export default ApiClient;
