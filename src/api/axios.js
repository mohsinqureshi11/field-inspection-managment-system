import axios from "axios";

const backend = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // agar cookies ya credentials chahiye
});

export const officerAPI = {
  getAllOfficers: async () => {
    const res = await backend.get("/officerapi/getAllOfficers");
    return res.data;
  },
  createOfficer: async (officerData) => {
    const res = await backend.post("/createOfficer/officerRegister", officerData);
    return res.data;
  }
};
