import API from '../../api/axios';

// Form API service
export const formAPI = {
  // Create a new form
  createForm: async (formData) => {
    try {
      const response = await API.post('/formapi/createForm', formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create form');
    }
  },

  // Get all forms
  getAllForms: async () => {
    try {
      const response = await API.get('/formapi/getAllForms');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch forms');
    }
  },

  // Get form by ID
  getFormById: async (formId) => {
    try {
      const response = await API.get(`/formapi/getForm/${formId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch form');
    }
  },

  // Update form
  updateForm: async (formId, formData) => {
    try {
      const response = await API.put(`/formapi/updateForm/${formId}`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update form');
    }
  },

  // Delete form
  deleteForm: async (formId) => {
    try {
      const response = await API.delete(`/formapi/deleteForm/${formId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete form');
    }
  }
};

// Officer API service
export const officerAPI = {
  // Get all officers
  getAllOfficers: async () => {
    try {
      const response = await API.get('/officerapi/getAllOfficers');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch officers');
    }
  },

  // Create officer
  createOfficer: async (officerData) => {
    try {
      const response = await API.post('/createOfficer/officerRegister', officerData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create officer');
    }
  }
};
