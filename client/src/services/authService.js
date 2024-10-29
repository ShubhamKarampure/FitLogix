// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/users/auth';

export const register = (email, password) => {
  return axios.post(`${API_URL}/register`, { email, password });
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user_id', response.data.user_id);
  }
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
};
