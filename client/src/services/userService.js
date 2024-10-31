// services/userService.js
import axios from 'axios';
import { API_ROUTES } from './apiRoutes'; // Import API_ROUTES

// Function to fetch user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(API_ROUTES.GETUSER(userId)); // Use API_ROUTES to construct the URL
    return response.data; // Return user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Rethrow error to handle in component
  }
};
