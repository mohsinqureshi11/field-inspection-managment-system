import React, { useState } from "react";
import { officerAPI } from "../api/axios.js"; // hum axios instance use karenge

const Onboarding = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    gander: "",
    age: "",
    phoneNumber: "",
    desigination: "",
    profilePhoto: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profilePhoto: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // axios instance se POST request
      const res = await officerAPI.createOfficer({
        userName: formData.userName,
        email: formData.email,
        gander: formData.gander,
        age: formData.age,
        phoneNumber: formData.phoneNumber,
        desigination: formData.desigination,
        // profilePhoto backend me handle nahi ho raha abhi
      });

      console.log("Response from backend:", res);
      setMessage(res.message || "Officer registered successfully!");

      // form reset
      setFormData({
        userName: "",
        email: "",
        gander: "",
        age: "",
        phoneNumber: "",
        desigination: "",
        profilePhoto: null,
      });

    } catch (error) {
      console.error("Error submitting form:", error.response || error);
      setMessage(error.response?.data?.message || "Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Officer Onboarding</h2>
      {message && <p className="mb-4 text-center text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="userName" placeholder="User Name" value={formData.userName} onChange={handleChange} required className="w-full border p-2 rounded"/>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full border p-2 rounded"/>
        <select name="gander" value={formData.gander} onChange={handleChange} required className="w-full border p-2 rounded">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required className="w-full border p-2 rounded"/>
        <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required className="w-full border p-2 rounded"/>
        <input type="text" name="desigination" placeholder="Designation" value={formData.desigination} onChange={handleChange} required className="w-full border p-2 rounded"/>
        <input type="file" name="profilePhoto" onChange={handleFileChange} accept="image/*" className="w-full border p-2 rounded"/>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? "Registering..." : "Register Officer"}
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
