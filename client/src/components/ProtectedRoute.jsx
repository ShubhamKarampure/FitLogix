// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Check if the token exists and is valid
  const isAuthenticated = () => {
    if (!token) return false;

    try {
     const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds

      // Check if token is expired
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
