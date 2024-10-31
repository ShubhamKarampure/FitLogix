// src/services/authService.js

import axios from 'axios';
import { API_ROUTES } from './apiRoutes';

// Register a new user
export const register = (email, password) => {
  return axios.post(API_ROUTES.REGISTER, { email, password });
};

// Login a user
export const login = async (email, password) => {
  const response = await axios.post(API_ROUTES.LOGIN, { email, password }, {
    withCredentials: true, // sending and receiving cookies
  });
  
  return response.data;
}

// Logout a user
export const logout = async () => {
  await axios.post(API_ROUTES.LOGOUT, {}, {
    withCredentials: true, // sending cookies
  });
};
