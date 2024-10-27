import React, { useState } from 'react';
import { register } from '../../services/authService'; // Adjust according to your structure
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
  minH: '450px', // Same height as LoginPage
  maxW: '400px',
  p: 6,
  borderRadius: 'lg',
  boxShadow: 'lg',
};

export default function Register({ closeRegister }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    try {
      await register(email, password); 
      alert('Registration successful');
      navigate('/dashboard');
    } catch (error) {
      alert('Registration failed. Please try again.');
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
        onClick={closeRegister}
        position="absolute"
        top={2}
        right={2}
        size="sm"
        variant="outline"
        colorScheme="red"
        borderRadius="full"
      />
      <Stack spacing={4} textAlign="center" mb={4}>
        <Heading fontSize={'2xl'}>Sign Up</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          Create an account to get started
        </Text>
      </Stack>
      <Container>
        <Stack spacing={5}>
          <form onSubmit={handleRegister}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <FormControl id="confirm-password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Sign Up
            </Button>
            <Stack pt={4}>
              <Text align={'center'} fontSize={'sm'}>
                Already have an account?{' '}
                <Link color={'green.400'}>Log in</Link>
              </Text>
            </Stack>
          </form>
        </Stack>
      </Container>
    </Box>
  );
}
