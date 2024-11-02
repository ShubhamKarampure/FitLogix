import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../services/apiRoutes';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state to hold user information
  const [loading, setLoading] = useState(true); // Loading state to manage loading status
  const [error, setError] = useState(null); // Error state to manage errors

  // Check if the user is authenticated
  const checkAuth = async () => {
    try {
      const response = await axios.get(API_ROUTES.STATUS, {
        withCredentials: true,
      });
      setUser(response.data.user); // Set the user data from the response
    } catch (error) {
      setUser(null); // If there's an error, set user to null
    } finally {
      setLoading(false); // Set loading to false once the check is done
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const response = await axios.get(API_ROUTES.STATUS, {
        withCredentials: true,
      });
      setUser(response.data.user); // Update user data
    } catch (error) {
      console.log('Failed to refresh user data:', error);
      // Optionally handle error for refreshing user data
    }
  };

  // Login a user
const login = async (email, password) => {
  try {
    const response = await axios.post(API_ROUTES.LOGIN, { email, password }, {
      withCredentials: true,
    });
    setUser(response.data.user); // Set user data from response
    console.log(response.data.user)
  } catch (error) {
    setError(error.response?.data?.message || 'Login failed');
    throw error; // Propagate error
  }
};

// Logout a user
const logout = async () => {
  try {
    await axios.post(API_ROUTES.LOGOUT, {}, {
      withCredentials: true,
    });
    setUser(null); // Clear user on logout
  } catch (error) {
    setError(error.response?.data?.message || 'Logout failed');
    throw error; // Propagate error
  }
};

// Register a new user
const register = async (email, password) => {
  try {
    const response = await axios.post(API_ROUTES.REGISTER, { email, password });
    setUser(response.data.user); // Set user data from response after registration
    return response.data; // Return response data if needed
  } catch (error) {
    setError(error.response?.data?.message || 'Registration failed');
    throw error; // Propagate error
  }
};

  // useEffect to check authentication status on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Calculate isAuthenticated based on the user state
  const isAuthenticated = user !== null; // True if user is not null

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, checkAuth, refreshUser, login, logout, register, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useUser = () => {
  return useContext(AuthContext);
};
