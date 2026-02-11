import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor - add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
    logout: () => api.post('/auth/logout')
};

// User API
export const userAPI = {
    getProfile: () => api.get('/user/profile'),
    updateProfile: (data) => api.put('/user/profile', data),
    getHistory: () => api.get('/user/history'),
    deleteHistory: (id) => api.delete(`/user/history/${id}`)
};

// AI Tools API
export const aiAPI = {
    chat: (data) => api.post('/ai/chat', data),
    generateImage: (data) => api.post('/ai/image', data),
    buildResume: (data) => api.post('/ai/resume', data),
    generateCode: (data) => api.post('/ai/code', data),
    studyAssistant: (data) => api.post('/ai/study', data),
    generateContent: (data) => api.post('/ai/content', data)
};

// Admin API
export const adminAPI = {
    getUsers: () => api.get('/admin/users'),
    updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
    getAnalytics: () => api.get('/admin/analytics')
};

export default api;
