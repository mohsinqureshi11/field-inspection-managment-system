import axios from "axios";
console.log("env variable showin",process.env.VITE_API_BACKEND_URL);

// backend URL from .env
const backend = axios.create({
  baseURL: process.env.VITE_API_BACKEND_URL,
  // withCredentials: true, // agar cookies ya credentials chahiye
});

export const officerAPI = {
  getAllOfficers: async () => {
    const res = await backend.get("/officerapi/getAllOfficers");
    return res.data;
  },
};
