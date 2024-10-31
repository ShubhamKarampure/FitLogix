import React from "react";
import { Container, Box, Flex } from "@chakra-ui/react";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar"; 
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
      <Flex bg="gray.50" minHeight="100vh">
          <Sidebar/>
      <Box flex="1" ml="150px">
        <Navbar page="Dashboard"/>
        <Container maxW="container.xl" p={4} pt="24">
          <Outlet/>
        </Container>
      </Box>
    </Flex>
  );
};

export default Layout;
