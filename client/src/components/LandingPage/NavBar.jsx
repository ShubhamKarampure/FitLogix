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
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';

const NavLink = ({ children, href }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('orange.300', 'orange.600'),
    }}
    color={useColorModeValue('black', 'white')}
    href={href}
  >
    {children}
  </Link>
);

const HomeNavbar = ({ onLoginOpen, onRegisterOpen }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

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

  // Always return loading state before rendering the navbar
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      bg={useColorModeValue('white', 'black')}
      color={useColorModeValue('black', 'white')}
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
            color={useColorModeValue('black', 'white')}
            bg={useColorModeValue('gray.100', 'gray.700')}
            borderColor={useColorModeValue('orange.300', 'orange.600')}
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
