import axios from 'axios';

// Set the base URL based on the environment
let BASE_URL = 'http://localhost:4000/api';


const NITISH = 1;
const KHUSHI = 0;
const PRINCE = 0;
const PRABHAT = 0;


if(NITISH){
  BASE_URL = 'http://192.168.1.38:4000/api';
}else if(KHUSHI){
  BASE_URL = 'http://192.168.1.38:4000/api';
}else if(PRINCE){
  BASE_URL = 'http://192.168.1.38:4000/api';
}else if(PRABHAT){
  BASE_URL = 'http://192.168.1.38:4000/api';
}

const authService = {
  register: async (userData) => {
    try {
        console.log(userData)
        const url = `${BASE_URL}/auth/register`;
      const response = await axios.post(url, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },
};

export default authService;
