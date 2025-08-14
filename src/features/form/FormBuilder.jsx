import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addForm } from "./formSlice";
import { formAPI, officerAPI } from "./formAPI.js";

const fieldTypes = [
  { id: "text", label: "Text Input", icon: "📝" },
  { id: "textarea", label: "Long Text", icon: "📄" },
  { id: "radio", label: "Multiple Choice", icon: "🔘" },
  { id: "checkbox", label: "Checkboxes", icon: "☑️" },
  { id: "dropdown", label: "Dropdown", icon: "▾" },
  { id: "file", label: "File Upload", icon: "📁" },
  { id: "date", label: "Date", icon: "📅" },
  { id: "time", label: "Time", icon: "⏰" },
  { id: "datetime-local", label: "Date & Time", icon: "🗓️" },
];

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState("");
  const [fields, setFields] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const dispatch = useDispatch();

  // Fetch officers from backend
  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await officerAPI.getAllOfficers();
        if (response.success && Array.isArray(response.data)) {
          setOfficers(response.data);
        } else {
          setOfficers([]);
        }
      } catch (error) {
        console.error("Error fetching officers:", error);
        setOfficers([]);
      }
    };
    
    fetchOfficers();
  }, []);

  // Add a new field
  const addField = (type) => {
    const newField = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      type,
      question: "",
      options: ["Option 1"],
      required: false,
      fileTypes: type === "file" ? ["image/*", ".pdf"] : [],
      maxFileSize: 5,
    };
    setFields((prev) => [...prev, newField]);
  };

  // Update field values
  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  // Submit form to Redux and backend
  const submitForm = async () => {
    if (!formTitle.trim()) {
      alert("Please enter a form title");
      return;
    }
    if (fields.length === 0) {
      alert("Please add at least one field");
      return;
    }

    // Redux local save
    dispatch(
      addForm({
        id: Date.now().toString(),
        title: formTitle,
        fields,
        officerId: selectedOfficer || null,
        createdAt: new Date().toISOString(),
      })
    );

    // Backend POST
    try {
      await formAPI.createForm({
        title: formTitle,
        fields,
        officerId: selectedOfficer || null,
      });
      alert("Form submitted successfully!");
      setFormTitle("");
      setFields([]);
      setSelectedOfficer("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error submitting form: ${error.message}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Officer Dropdown */}
      <div className="flex items-center justify-end mb-4 gap-2">
        <select
          value={selectedOfficer}
          onChange={(e) => setSelectedOfficer(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Officer (optional)</option>
          {officers.map((officer) => (
            <option key={officer._id} value={officer._id}>
              {officer.userName}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-2xl font-bold mb-6">Dynamic Form Builder</h2>

      {/* Form Title */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <label className="block text-sm font-medium mb-2">Form Title *</label>
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter form title"
          required
        />
      </div>

      {/* Field Types */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-3">Add Field Types</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {fieldTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => addField(type.id)}
              className="flex flex-col items-center p-3 border rounded hover:bg-gray-50 transition-colors"
              title={type.label}
            >
              <span className="text-2xl mb-1">{type.icon}</span>
              <span className="text-xs">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Render Fields */}
      {fields.length > 0 && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-3">Form Fields</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="p-2 mb-2 border rounded">
              <label className="block mb-1">Q{index + 1}:</label>
              <input
                type="text"
                value={field.question}
                onChange={(e) =>
                  updateField(index, "question", e.target.value)
                }
                className="w-full p-1 border rounded"
                placeholder="Enter your question"
              />
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <div className="text-right">
        <button
          onClick={submitForm}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Submit Form
        </button>
      </div>
    </div>
  );
};

export default FormBuilder;
