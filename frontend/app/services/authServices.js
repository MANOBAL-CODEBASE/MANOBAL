import axios from 'axios';

const BASE_URL = 'http://192.168.1.38:4000';

const authService = {
  register: async (userData) => {
    try {
      const url = `${BASE_URL}/api/auth/register`;
      const response = await axios.post(url, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },
};

export default authService;
