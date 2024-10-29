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
import logo from '../../assets/logo.png'

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

const Navbar = ({ onLoginOpen, onRegisterOpen }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'black')} // White background for light mode, black for dark mode
      color={useColorModeValue('black', 'white')} // Black text for light mode, white for dark mode
      px={4}
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
          <Button variant={'solid'} colorScheme={'orange'} size={'sm'} onClick={onLoginOpen}>
            Log In
          </Button>
          <Button variant={'outline'} color={'orange.300'} size={'sm'} onClick={onRegisterOpen}>
            Sign Up
          </Button>
        </HStack>
      </Flex>
    </Box>
  )
};

export default Navbar;
