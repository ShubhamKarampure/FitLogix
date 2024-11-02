import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Input,
  IconButton,
  Avatar,
  Text,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { FiBell, FiMessageCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

const Navbar = ({ page }) => {
  const { isAuthenticated, checkAuth, loading, logout,user } = useUser(); // Use the logout from AuthContext
  const navigate = useNavigate(); 
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from AuthContext
      await checkAuth(); // Re-check authentication status
      toast({
        title: "Logout Successful.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/'); 
    } catch (error) {
      console.error("Logout failed", error);
      toast({
        title: "Logout Failed.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg="white"
      px={6}
      position="fixed"
      width="calc(100% - 150px)"
      left="150px"
      zIndex="1000"
    >
      <Flex h={24} alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" color="black">
          {page}
        </Text>

        <HStack spacing={4} ml="auto" alignItems="center">
          <Input
            placeholder="Search..."
            size="md"
            variant="outline"
            width="300px"
            borderColor="orange.300"
            _placeholder={{ color: 'gray.400' }}
          />

          <IconButton
            aria-label="Notifications"
            icon={<FiBell />}
            variant="outline"
            colorScheme="orange"
            borderColor="orange.300"
            size="lg"
          />

          <IconButton
            aria-label="Chat"
            icon={<FiMessageCircle />}
            variant="outline"
            colorScheme="orange"
            borderColor="orange.300"
            size="lg"
          />

          {/* Profile section with dropdown */}
          <Menu>
            <MenuButton as={Button} variant="link">
              <HStack spacing={2}>
                <Avatar size="md" name={user.profile.name } src={user.profile.avatar} />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => window.location.href = '/profile'}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => window.location.href = '/settings'}>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
