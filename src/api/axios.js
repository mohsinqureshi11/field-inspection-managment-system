import axios from "axios";

// console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
const backend = axios.create({
  baseURL: "https://fims-backend-lac.vercel.app",
  // withCredentials: true, // agar cookies ya credentials chahiye
});

export const officerAPI = {
  getAllOfficers: async () => {
    const res = await backend.get("/officerapi/getAllOfficers");
    return res.data;
  },
  createOfficer: async (officerData) => {
    console.log("Sending officer data:", officerData); 
    const res = await backend.post("/createOfficer/officerRegister", officerData);
    console.log("Response from backend:", res.data);
    return res.data;
  }
};
