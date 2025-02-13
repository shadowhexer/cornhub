import axios, { type AxiosInstance } from 'axios';
import { onMounted } from 'vue';

const API: AxiosInstance = axios.create({
  baseURL: 'http://api.onlycorn.com:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
});

// Enable automatic CSRF token handling
API.defaults.withXSRFToken = true;

// Add to your API requests
// API.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export default API;