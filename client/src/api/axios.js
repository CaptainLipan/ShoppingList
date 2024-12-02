import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, // Dynamically load the backend URL from environment variables
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
