import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token invalid/expired - clear session and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('rememberedEmail');
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Homestay APIs
export const getHomestays = () => api.get('/homestays');
export const getHomestayById = (id) => api.get(`/homestays/${id}`);
export const searchHomestays = (query) => api.get(`/homestays/search?q=${query}`);
export const createHomestay = (data) => api.post('/homestays', data);
export const updateHomestay = (id, data) => api.put(`/homestays/${id}`, data);
export const deleteHomestay = (id) => api.delete(`/homestays/${id}`);

// Booking APIs
export const getBookings = () => api.get('/bookings');
export const createBooking = (data) => api.post('/bookings', data);
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

// Auth APIs
export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');
export const updateProfile = (data) => api.put('/auth/profile', data);

// AI Planner API
export const generateTravelPlan = (data) => api.post('/ai/planner', data);

export default api;
