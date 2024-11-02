import React, { useState, useEffect } from "react";
import { Box, Flex, Container, Spinner, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Dashboard/Header";
import DailyOverview from "../components/Dashboard/DailyOverview";
import WorkoutLog from "../components/Dashboard/WorkoutLog";
import MealLog from "../components/Dashboard/MealLog";
import ProgressTracking from "../components/Dashboard/ProgressTracking";
import HealthTips from "../components/Dashboard/HealthTips";
import { useUser } from "../context/userContext";

const Dashboard = () => {
  const { user, loading: authLoading } = useUser(); // Ensure loading state is provided
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and loading is complete
    if (!authLoading) {
      if (!user || !user.profile) { // Check if user or profile is not set
        navigate('/home/setup'); // Redirect to /setup
      } else {
        setLoading(false); // Set loading to false if the profile exists
      }
    }
  }, [user, authLoading, navigate]);

  if (loading) {
    // Show loading spinner while fetching user data
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
      <Header name={user?.profile?.name || "User"} /> 
      <DailyOverview />
      <WorkoutLog />
      <MealLog />
      <ProgressTracking />
      <HealthTips />
    </>
  );
};

export default Dashboard;
