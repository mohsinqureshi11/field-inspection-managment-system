import axios from "axios";

// Change this to your Vercel backend URL
const BASE_URL = process.env.REACT_APP_BACKEND_URL;


export const officerAPI = {
  getAllOfficers: async () => {
    const response = await axios.get(`${BASE_URL}/officerapi/getAllOfficers`);
    return response.data;
  },
  createOfficer: async (officerData) => {
    const response = await axios.post(`${BASE_URL}/createOfficer/officerRegister`, officerData);
    return response.data;
  }
};
