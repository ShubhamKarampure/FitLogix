import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { useUser } from '../context/userContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();

  if (loading) return <div>Loading...</div>; 

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
