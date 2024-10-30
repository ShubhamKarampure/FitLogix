import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/users'; 

// Function to fetch user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
      return response.data; // Return user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Rethrow error to handle in component
  }
};
