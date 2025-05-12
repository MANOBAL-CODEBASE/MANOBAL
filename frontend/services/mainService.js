import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const mainService = {
  // User profile operations
  getUser: async () => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUserProfile: async (userData) => {
    try {
      const response = await axios.put(`${API_URL}/users/profile`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  uploadProfilePicture: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/users/profile/picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Chat operations
  sendMessage: async (message) => {
    try {
      const response = await axios.post(`${API_URL}/chat/messages`, message);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMessages: async () => {
    try {
      const response = await axios.get(`${API_URL}/chat/messages`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Assessment operations
  submitAssessment: async (assessmentData) => {
    try {
      const response = await axios.post(`${API_URL}/assessments`, assessmentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAssessments: async () => {
    try {
      const response = await axios.get(`${API_URL}/assessments`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default mainService; 