import React from 'react';
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
} from '@chakra-ui/react';
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom"; 

const Register = ({ isOpen, onClose, onLogin }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { login, register } = useUser();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;
    const retypePassword = e.target.retypePassword.value;

    if (password !== retypePassword) {
      // Show error toast if passwords do not match
      toast({
        title: "Registration Failed.",
        description: "Passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Call the register function from authService
      await register(email, password);
      
      // Show success toast
      toast({
        title: "Registration Successful.",
        description: "You can now log in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Close the modal on successful registration
      login(email, password);
      navigate('/home/dashboard');
    } catch (error) {
      // Handle registration failure
      toast({
        title: "Registration Failed.",
        description: error.response?.data?.message || "Please check your inputs.",
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
        <ModalHeader>Create Your Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleRegister}>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" placeholder="Enter your email" required />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" placeholder="Enter your password" required />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Re-type Password</FormLabel>
              <Input name="retypePassword" type="password" placeholder="Re-enter your password" required />
            </FormControl>
            <Button type="submit" colorScheme="orange" width="full" mt={4}>
              Register
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Text textAlign="center" width="100%">
            Already have an account?{" "}
            <Button
              variant="link"
              colorScheme="orange"
              onClick={() => {
                onClose();
                onLogin();
              }}
            >
              Log In
            </Button>
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Register;
