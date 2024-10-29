import React, { useEffect } from "react"; // Import useEffect
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = ({ isOpen, onClose, onRegister }) => {
  const toast = useToast();
  const navigate = useNavigate(); 
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Call the login function from authService
      const userData = await login(email, password);
      
      // Show success toast
      toast({
        title: "Login Successful.",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Close the modal on successful login
      localStorage.setItem("token", userData.token); // Save token to local storage
      navigate('/dashboard'); // Navigate to the dashboard
    } catch (error) {
      // Handle login failure
      toast({
        title: "Login Failed.",
        description: error.response?.data?.message || "Please check your credentials.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login to Your Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleLogin}>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="orange" width="full" mt={4}>
              Login
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Text textAlign="center" width="100%">
            Don't have an account?{" "}
            <Button
              variant="link"
              colorScheme="orange"
              onClick={() => {
                onClose();
                onRegister();
              }}
            >
              Sign Up
            </Button>
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Login;
