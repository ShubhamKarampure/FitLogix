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

const Register = ({ isOpen, onClose, onLogin }) => {
  const toast = useToast();

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here (e.g., API call)
    const username = e.target.username.value; // Get username
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Example validation
    if (username && email && password) {
      toast({
        title: "Registration Successful.",
        description: "You can now log in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Close the modal on successful registration
    } else {
      toast({
        title: "Registration Failed.",
        description: "Please check your inputs.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onLogin={onLogin}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Your Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleRegister}>
            <FormControl mb={4}>
              <FormLabel>Username</FormLabel>
              <Input name="username" type="text" placeholder="Enter your username" required />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" placeholder="Enter your email" required />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" placeholder="Enter your password" required />
            </FormControl>
            <Button type="submit" colorScheme="orange" width="full" mt={4}>
              Register
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Text textAlign="center" width="100%">
            Already have an account? <Button variant="link" colorScheme="orange" onClick={() => {
                onClose(); 
                onLogin(); 
              }}>Log In</Button>
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Register;
