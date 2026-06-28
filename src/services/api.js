import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export default api;