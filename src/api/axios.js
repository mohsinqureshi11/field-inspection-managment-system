// src/api/axios.js
import axios from "axios";

// Backend URL
const API = axios.create({
  baseURL: "https://fims-backend-one.vercel.app", // tumhara deployed backend
  // agar cookies/pass kar rahe ho to:
  withCredentials: true
});

export default API;
