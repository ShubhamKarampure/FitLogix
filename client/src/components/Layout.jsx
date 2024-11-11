import React from "react";
import { Container, Box, Flex } from "@chakra-ui/react";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar"; 
import { Outlet, useLocation } from "react-router-dom";


const Layout = () => {
  const location = useLocation();
  
  // Determine the title based on the current path
  const pathName = location.pathname.split("/").pop(); // Get the last part of the path
  let title;

  switch (pathName) {
    case "dashboard":
      title = "Dashboard";
      break;
    case "profile":
      title = "Profile";
      break;
    case "meal-log":
      title = "Meal Log";
      break;
    case "progress-tracking":
      title = "Progress Tracking";
      break;
    case "workout-log":
      title = "Workout Log";
      break;
    case "chatbot":
      title = "Chatbot";
      break;
    case "update":
      title = "Update Profile";
      break;
    case "settings":
      title = "Settings";
      break;
    default:
      title = "Home";
      break;
  }
  return (
      <Flex bg="gray.50" minHeight="100vh">
      <Sidebar/>
      <Box flex="1" ml="150px">
        <Navbar page={title} />
        <Container maxW="container.xl" p={4} pt="24">
          <Outlet/>
        </Container>
      </Box>
    </Flex>
  );
};

export default Layout;
