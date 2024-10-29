import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  IconButton,
  useColorModeValue,
  Link,
  Image,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../../assets/logo.png';
import { px } from 'framer-motion';

const NavLink = ({ children, href }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('orange.300', 'orange.600'), // Change hover color to orange
    }}
    color={useColorModeValue('black', 'white')} // Black text for light mode, white for dark mode
    href={href}
  >
    {children}
  </Link>
);

const HomeNavbar = ({ onLoginOpen, onRegisterOpen }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = () => {
    const token = localStorage.getItem('token'); // Check for token
    if (token) {
      navigate('/dashboard'); // Navigate to dashboard if token exists
    } else {
      onLoginOpen(); // Open login modal if no token
    }
  };

  const handleRegisterClick = () => {
    const token = localStorage.getItem('token'); // Check for token
    if (token) {
      navigate('/dashboard'); // Navigate to dashboard if token exists
    } else {
      onRegisterOpen(); // Open register modal if no token
    }
  };

  return (
    <Box
      bg={useColorModeValue('white', 'black')} // White background for light mode, black for dark mode
      color={useColorModeValue('black', 'white')} // Black text for light mode, white for dark mode
      px={6}
      boxShadow="md"
      position="fixed" // Keep navbar fixed on scroll
      width="100%" // Make sure it spans the full width
      zIndex="1000" // Ensure it stays above other content
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Image
            src={logo}
            alt="FitTrack Logo"
            height="50px" // Adjust height as needed
          />
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink href="#">Home</NavLink>
            <NavLink href="#">Features</NavLink>
            <NavLink href="#">Pricing</NavLink>
            <NavLink href="#">About</NavLink>
            <Menu>
              <MenuButton as={Button} variant="link" color={useColorModeValue('black', 'white')}>
                More
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <NavLink href="#">Blog</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink href="#">Support</NavLink>
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
        <HStack spacing={4}>
          <Input
            placeholder="Search..."
            size="md"
            variant="filled"
            width="200px"
            color={useColorModeValue('black', 'white')} // Black placeholder text in light mode
            bg={useColorModeValue('gray.100', 'gray.700')} // Light gray background for input
            borderColor={useColorModeValue('orange.300', 'orange.600')} // Orange border
          />
          <IconButton
            aria-label="Search database"
            icon={<FaSearch />}
            variant="outline"
            colorScheme="orange" // Orange color scheme for the button
          />
          <Button variant={'solid'} colorScheme={'orange'} size={'sm'} onClick={handleLoginClick}>
            Log In
          </Button>
          <Button variant={'outline'} color={'orange.300'} size={'sm'} onClick={handleRegisterClick}>
            Sign Up
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default HomeNavbar;
