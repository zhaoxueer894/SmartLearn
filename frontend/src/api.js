import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // Assuming backend runs on 8080
    headers: {
        'Content-Type': 'application/json',
    },
});

// Simple token management (replace with actual logic if needed)
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
