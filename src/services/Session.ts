import { defineStore } from 'pinia'
import { pinia } from '@/main'
import axios from 'axios'

interface User {
id: number;
name: string;
email: string;
email_verified_at: string;
created_at: Date;
role: string;
avatar: string;
login_status: boolean;
}

interface AuthState {
token: string | null;
user: User | null;
}

// Create axios instance
export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})
  
export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user') || 'null'),
    }),
    actions: {
        setAuth(token: string, user: User) {
        this.token = token;
        this.user = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        },
        
        logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token && !!state.user,
      },

});

// Setup axios interceptors
API.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
  
API.interceptors.response.use(
(response) => response,
(error) => {
    if (error.response?.status === 401) {
    const authStore = useAuthStore(pinia); // Pass the Pinia instance
    authStore.logout();
    }
    return Promise.reject(error);
}
);