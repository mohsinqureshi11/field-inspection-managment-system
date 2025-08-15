import axios from "axios";

// backend URL from .env
const backend = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  // withCredentials: true, // agar cookies ya credentials chahiye
});

export const officerAPI = {
  getAllOfficers: async () => {
    const res = await backend.get("/officerapi/getAllOfficers");
    return res.data;
  },
};
