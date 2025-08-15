import axios from "axios";


// backend URL from .env
const backend = axios.create({
  baseURL: "https://fims-backend-lac.vercel.app",
  // withCredentials: true, // agar cookies ya credentials chahiye
});

export const officerAPI = {
  getAllOfficers: async () => {
    const res = await backend.get("/officerapi/getAllOfficers");
    return res.data;
  },
  deleteOfficer: async (officerName) => {
    const res = await backend.delete(`/deleteOfficer/deleteOfficer/${officerName}`);
    return res.data;
  },
};
