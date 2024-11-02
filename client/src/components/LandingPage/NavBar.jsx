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
  Link,
  Image,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useUser } from '../../context/userContext';

const NavLink = ({ children, href }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'orange.300', // Light mode hover color
    }}
    color="black" // Light mode text color
    href={href}
  >
    {children}
  </Link>
);

const HomeNavbar = ({ onLoginOpen, onRegisterOpen }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useUser();
  
  // Handle login click
  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate('home/dashboard');
    } else {
      onLoginOpen();
    }
  };

  // Handle register click
  const handleRegisterClick = () => {
    if (isAuthenticated) {
      navigate('home/dashboard');
    } else {
      onRegisterOpen();
    }
  };

 

  return (
    <Box
      bg="white" // Light mode background color
      color="black" // Light mode text color
      px={6}
      boxShadow="md"
      position="fixed"
      width="100%"
      zIndex="1000"
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Image
            src={logo}
            alt="FitTrack Logo"
            height="50px"
          />
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink href="#">Home</NavLink>
            <NavLink href="#">Features</NavLink>
            <NavLink href="#">Pricing</NavLink>
            <NavLink href="#">About</NavLink>
            <Menu>
              <MenuButton as={Button} variant="link" color="black">
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
            color="black" // Light mode input text color
            bg="gray.100" // Light mode input background
            borderColor="orange.300"
          />
          <IconButton
            aria-label="Search database"
            icon={<FaSearch />}
            variant="outline"
            colorScheme="orange"
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
