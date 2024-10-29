import React from "react";
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

const Login = ({ isOpen, onClose, onRegister }) => {
  const toast = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call)
    // This is just an example. Replace with actual authentication logic.
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Example validation
    if (email && password) {
      toast({
        title: "Login Successful.",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Close the modal on successful login
    } else {
      toast({
        title: "Login Failed.",
        description: "Please check your credentials.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onRegister={onRegister}>
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
