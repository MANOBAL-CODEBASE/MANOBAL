import axios from 'axios';
import authService from './authServices';

const BASE_URL = 'http://192.168.1.36:4000';

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
  getUser: async () => {
    try {
      const url = `${BASE_URL}/api/main/get-user`;
      const token = await authService.getToken();
      const response = await axios.get(url, {
        headers: {
          manobal: token,
        },
      });
      if (response.data.success) {
        return response.data.user;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
  getScore: async () => {
    try {
      const url = `${BASE_URL}/api/main/get-score`;
      const token = await authService.getToken();
      const response = await axios.get(url, {
        headers: {
          manobal: token,
        },
      });
      if (response.data.success) {
        return response.data.score.scores;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
  fetchPosts: async () => {
    try {
      const url = `${BASE_URL}/api/main/fetch-posts`;
      const token = await authService.getToken();
      const response = await axios.get(url, {
        headers: {
          manobal: token,
        },
      });
      if (response.data.success) {
        return response.data.posts;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
  createPost: async (postData) => {
    try {
      const url = `${BASE_URL}/api/main/create-post`;
      const token = await authService.getToken();

      const response = await axios.post(url, postData, {
        headers: {
          manobal: token,
          'Content-Type': 'application/json',
        },
      });
      if (response) {
        return response.data;
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },
  fetchMyPosts: async () => {
    try {
      const url = `${BASE_URL}/api/main/fetch-my-posts`;
      const token = await authService.getToken();
      const response = await axios.get(url, {
        headers: {
          manobal: token,
        },
      });
      if (response) {
        return response.data;
      } else {
        throw new Error('Failed to fetch post');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },
  deletePost: async (postId) => {
    try {
      const url = `${BASE_URL}/api/main/delete-post/${postId}`;
      console.log(url);
  
      const token = await authService.getToken();
  
      const response = await axios.delete(url, {
        headers: {
          manobal: token, 
        },
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },
  getNextTask: async () => {
    try {
      const url = `${BASE_URL}/api/main/get-next-task`;
      const token = await authService.getToken();
      const response = await axios.get(url, {
        headers: {
          manobal: token,
        },
      });
      if (response.data.success) {
        return response.data.task; // Return only the task object
      } else {
        throw new Error(response.data.message || 'Failed to fetch next task');
      }
    } catch (error) {
      console.error('Error fetching next task:', error);
      throw error;
    }
  },

  completeTask: async () => {
    try {
      const url = `${BASE_URL}/api/main/complete-task`;
      const token = await authService.getToken();
      const response = await axios.get(url, {
        headers: {
          manobal: token,
        },
      });
      if (response.data.success) {
        return response.data.tasks;
      } else {
        throw new Error(response.data.message || 'Failed to fetch completed tasks');
      }
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
      throw error;
    }
  }
  
  
};

export default mainService;
