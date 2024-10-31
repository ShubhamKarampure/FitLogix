import React from 'react';
import { Box, Button, Flex, Heading, Text, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaArrowLeft, FaHome } from 'react-icons/fa';

export default function NotFound() {
  return (
    <Flex
      minH="100vh"
      bg="white"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={{ base: 4, sm: 6, lg: 8 }}
    >
      <Box maxW="md" w="full" textAlign="center" spaceY={8}>
        <Flex justifyContent="center">
          <Icon as={FaDumbbell} boxSize={24} color="orange.500" />
        </Flex>
        <Heading as="h1" fontSize={{ base: '4xl', sm: '5xl', lg: '6xl' }} fontWeight="extrabold" color="gray.900">
          404
        </Heading>
        <Text fontSize="xl" color="gray.500">Oops! This page is on a rest day.</Text>
        <Text fontSize="sm" color="gray.400">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Flex mt={8} flexDirection={{ base: 'column', sm: 'row' }} gap={4} justifyContent="center">
          <Button
            as={Link}
            to="/"
            leftIcon={<FaHome />}
            bg="orange.500"
            color="white"
            _hover={{ bg: 'orange.600' }}
          >
            Go to Homepage
          </Button>
          <Button as={Link} to="/workouts" variant="outline" leftIcon={<FaArrowLeft />}>
            Back to Workouts
          </Button>
        </Flex>
      </Box>
      <Box as="footer" mt={16} textAlign="center">
        <Text fontSize="sm" color="gray.500">
          &copy; {new Date().getFullYear()} FitTrack. All rights reserved.
        </Text>
      </Box>
    </Flex>
  );
}
