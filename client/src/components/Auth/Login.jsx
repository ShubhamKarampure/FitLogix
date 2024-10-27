import React, { useState } from 'react';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';

const formStyles = {
  minh: '450px', 
  maxW: '400px',
  p: 6,
  borderRadius: 'lg',
  boxShadow: 'lg',
};

export default function Login({ closeLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      alert('Login successful');
      navigate('/dashboard'); 
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <Box 
      bg={useColorModeValue('white', 'gray.800')} 
      {...formStyles}
      position="relative" 
    >
      <IconButton
        aria-label="Close"
        icon={<FaTimes />}
        onClick={closeLogin}
        position="absolute"
        top={2}
        right={2}
        size="sm"
        variant="outline"
        colorScheme="red"
        borderRadius="full"
      />
      <Stack spacing={4} textAlign="center" mb={4}>
        <Heading fontSize={'2xl'}>Login</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          Your journey to a healthier you starts here
        </Text>
      </Stack>
      <Container>
        <Stack spacing={5}>
          <form onSubmit={handleLogin}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="filled"
                height="48px" // Set height for consistency
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="filled"
                height="48px" // Set height for consistency
              />
            </FormControl>
            <Button
              type="submit"
              bg="linear-gradient(to right, #48BB78, #4299E1)"
              color={'white'}
              _hover={{
                bg: "linear-gradient(to right, #38A169, #3182CE)",
              }}
              width="full"
              height="48px" // Set height for consistency
              mt={4}
            >
              Log in
            </Button>
            <Stack pt={4}>
              <Text align={'center'} fontSize={'sm'}>
                Don't have an account?{' '}
                <Link color={'green.400'}>Sign up</Link>
              </Text>
            </Stack>
          </form>
        </Stack>
      </Container>
    </Box>
  );
}
