// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Box, Flex, Container, Spinner, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Dashboard/Header';
import DailyOverview from '../components/Dashboard/DailyOverview';
import WorkoutLog from '../components/Dashboard/WorkoutLog';
import MealLog from '../components/Dashboard/MealLog';
import ProgressTracking from '../components/Dashboard/ProgressTracking';
import HealthTips from '../components/Dashboard/HealthTips';
import Navbar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import { getUserById } from '../services/userService';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        try {
          const fetchedUser = await getUserById(userId); // Changed variable name
          if (!fetchedUser.profile) {
            navigate('/setup'); 
          } else {
            setUser(fetchedUser);
            localStorage.setItem('user', JSON.stringify(fetchedUser));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);

          // Optionally set an error state to show an error message
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      } else {
        navigate('/login'); // Redirect if user ID is missing
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) { // Show loading spinner while fetching user data
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex bg="gray.50" minHeight="100vh">
      <Box width="100px" position="fixed" height="100vh" zIndex="1001">
        <Sidebar />
      </Box>
      <Box flex="1" ml="150px">
        <Navbar page="Dashboard" avatar={user.profile.avatar}/>
        <Container maxW="container.xl" p={4} pt="24">
          <Header name={user?.profile?.name || 'User'} /> {/* Optional chaining */}
          <DailyOverview />
          <WorkoutLog />
          <MealLog />
          <ProgressTracking />
          <HealthTips />
        </Container>
      </Box>
    </Flex>
  );
};

export default Dashboard;
