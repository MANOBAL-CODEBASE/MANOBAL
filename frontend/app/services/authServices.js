import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.1.36:4000';

const authService = {
  register: async (userData) => {
    try {
      const url = `${BASE_URL}/api/auth/register`;
      const response = await axios.post(url, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  login: async (userData) => {
    try {
      const url = `${BASE_URL}/api/auth/login`;
      const response = await axios.post(url, userData);
      const token = response.data.token;
      await AsyncStorage.clear();
      await AsyncStorage.setItem('manobal', token);
      return response;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      // Clear all stored data in AsyncStorage
      await AsyncStorage.clear();
      console.log('User logged out and storage cleared');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error; // Re-throw the error if needed
    }
  },  
  getToken: async () => {
    try {
      const token = await AsyncStorage.getItem('manobal');
      if (token !== null) {
        console.log('Retrieved token');
        return token; // Successfully retrieved token
      } else {
        console.log('Token not found');
        return null; // Token does not exist
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null; // Return null if there’s an error
    }
  },
};

export default authService;
