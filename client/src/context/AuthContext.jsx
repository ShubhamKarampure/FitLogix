import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../services/apiRoutes'; // Ensure this is defined

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state to hold user information
  const [loading, setLoading] = useState(true); // Loading state to manage loading status

  // Check if the user is authenticated
  const checkAuth = async () => {
    try {
      const response = await axios.get(API_ROUTES.STATUS, { // Ensure API_ROUTES.STATUS is correct
        withCredentials: true,
      });
      setUser(response.data.user); // Set the user data from the response
      console.log(response.data.user)
    } catch (error) {
      setUser(null); // If there's an error, set user to null
    } finally {
      setLoading(false); // Set loading to false once the check is done
    }
  };

  // useEffect to check authentication status on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Calculate isAuthenticated based on the user state
  const isAuthenticated = user !== null; // True if user is not null

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
