import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { useUser } from '../context/userContext';

const RedirectToSetup = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>; 

  // If the user is logged in but has no profile, redirect to setup
  if (!user.profile) {
    return <Navigate to="/setup" />;
  }

  return children; 
};

export default RedirectToSetup;
