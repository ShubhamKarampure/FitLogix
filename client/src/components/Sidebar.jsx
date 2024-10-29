import React from 'react';
import { Box, Stack, IconButton, Image, Text, HStack } from '@chakra-ui/react';
import { FaHome, FaUser, FaDumbbell, FaUtensils, FaChartLine, FaBell, FaCog } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/icon.png';

const Sidebar = () => {
  const location = useLocation();

  // Define the menu items with path, icon, and label
  const menuItems = [
    { path: '/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
    { path: '/workout-plans', icon: FaDumbbell, label: 'Workout' },
    { path: '/meal-plans', icon: FaUtensils, label: 'Meals' },
    { path: '/progress-tracking', icon: FaChartLine, label: 'Progress' },
    { path: '/notifications', icon: FaBell, label: 'Notifications' },
    { path: '/settings', icon: FaCog, label: 'Settings' },
  ];

  return (
    <Box
      width="150px" // Reduced width
      height="100vh"
      bg="white"
      borderRight="1px solid #e2e8f0"
      padding="15px" // Adjusted padding
      position="fixed"
      zIndex="1001"
    >
      <Stack spacing={6} align="center">
        <Image src={logo} alt="Logo" boxSize="30px" /> {/* Adjusted logo size */}
        <Stack spacing={4} align="flex-start" width="100%">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} style={{ width: '100%' }}>
                <HStack
                  p={2} // Adjusted padding for menu items
                  borderRadius="md"
                  bg={isActive ? 'orange.100' : 'transparent'}
                  color={isActive ? 'orange.500' : 'gray.600'}
                  _hover={{ bg: 'orange.50', color: 'orange.400' }}
                  spacing={2} // Reduced spacing between icon and text
                  align="center"
                >
                  <item.icon size={18} /> {/* Reduced icon size */}
                  <Text fontSize="sm" fontWeight="medium" color="inherit"> {/* Adjusted font size */}
                    {item.label}
                  </Text>
                </HStack>
              </Link>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Sidebar;
