import axios from 'axios';
import authService from './authServices';

const BASE_URL = 'http://192.168.1.42:4000';

const mainService = {
  getQuestions: async () => {
    try {
      const url = `${BASE_URL}/api/main/get-questions`;
      const response = await axios.get(url);

      if (response.data.success) {
        return response.data.questions; // Return only the questions array
      } else {
        throw new Error(response.data.message || 'Failed to fetch questions');
      }
    } catch (error) {
      console.error('Error fetching questions:', error.message);
      throw error;
    }
  },
  assessment: async (answers) => {
    try {
      const url = `${BASE_URL}/api/main/assessment`;
      const token = await authService.getToken();
      const response = await axios.post(
        url,
        { answers },
        {
          headers: {
            manobal: token, // Include the token in the header
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error submitting answers:', error);
      throw error;
    }
  },
};

export default mainService;
