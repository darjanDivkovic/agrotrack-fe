// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Replace with your API base URL
    timeout: 10000, // Request timeout in milliseconds
    headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add auth token to headers if needed
        // config.headers['Authorization'] = 'Bearer token';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle global errors
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Response error:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Request error:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Axios error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;