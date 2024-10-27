// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const register = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem('userToken', response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('userToken');
};

export const getCurrentUser = () => {
  return localStorage.getItem('userToken');
};
