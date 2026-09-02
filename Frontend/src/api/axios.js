import axios from 'axios';

// Central axios instance — every API call in the app goes through this.
// Change this URL when you deploy your backend somewhere other than localhost.
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach the saved login token to every request, if there is one.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;