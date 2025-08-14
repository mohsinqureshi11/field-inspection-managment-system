// src/api/axios.js
import axios from "axios";

// Backend URL - Update this with your actual Vercel deployment URL
const API = axios.create({
  baseURL: "https://fims-backend-one.vercel.app", // Your deployed backend URL
  timeout: 10000, // 10 seconds timeout
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.response?.data);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.log('🔐 Unauthorized access');
    } else if (error.response?.status === 404) {
      // Handle not found
      console.log('🔍 Resource not found');
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.log('🛠️ Server error');
    }
    
    return Promise.reject(error);
  }
);

export default API;
