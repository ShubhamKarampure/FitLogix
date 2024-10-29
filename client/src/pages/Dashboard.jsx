import React from 'react';
import { Box, Flex, Container } from '@chakra-ui/react';
import Header from '../components/Dashboard/Header';
import DailyOverview from '../components/Dashboard/DailyOverview';
import WorkoutLog from '../components/Dashboard/WorkoutLog';
import MealLog from '../components/Dashboard/MealLog';
import ProgressTracking from '../components/Dashboard/ProgressTracking';
import HealthTips from '../components/Dashboard/HealthTips';
import Navbar from '../components/NavBar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  
  const userName = "John Doe"; // Replace with actual user data

  return (
    <Flex bg="gray.50" minHeight="100vh">
      {/* Sidebar with fixed width */}
      <Box width="100px" position="fixed" height="100vh" zIndex="1001">
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box flex="1" ml="150px"> {/* Match this margin to the sidebar width */}
        <Navbar />
        <Container maxW="container.xl" p={4} pt="24"> {/* Add top padding to avoid overlap */}
          <Header userName={userName} />
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
