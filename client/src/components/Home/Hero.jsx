import React from 'react';
import { Box, Button, Card, Heading, Text, Image, Flex, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Hero({ onRegisterOpen } ) {
  const navigate = useNavigate(); // Initialize useNavigate

  const getStarted = () => {
    const token = localStorage.getItem('token'); // Check for token
    if (token) {
      navigate('/dashboard'); // Navigate to dashboard if token exists
    } else {
      onRegisterOpen(); 
    }
  };

  return (
    <Box maxW="container.xl" mx="auto" p={4} py={20}>
      <Card 
        overflow="hidden" 
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.1), 0 8px 30px rgba(0, 0, 0, 0.1)" 
        borderRadius="lg"
        bg={useColorModeValue('white', 'black')} // Background color for light and dark modes
      >
        <Flex flexDirection={{ base: 'column', md: 'row' }}>
          <Flex 
            flex="1" 
            p={8} 
            alignItems="center" 
            justifyContent="center" 
            flexDirection="column"
          >
            <Heading as="h1" size="2xl" mb={4} color={useColorModeValue('black', 'white')}> {/* Updated heading color */}
              Transform Your Health Journey
            </Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')} mb={6}> {/* Updated text color for better contrast */}
              Track workouts, log meals, and achieve your fitness goals with FitTrack.
            </Text>
            <Button 
              size="lg" 
              w={{ base: 'full', md: 'auto' }} 
              colorScheme="orange" // Updated button color scheme to orange
              variant="solid" // Solid variant for better visibility
              onClick={getStarted} // Call the getStarted function on click
            >
              Get Started
            </Button>
          </Flex>
          <Flex 
            flex="1" 
            justifyContent="center" 
            alignItems="center"
          >
            <Image
              src="https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXhlcmNpc2V8ZW58MHx8MHx8fDA%3D?height=400&width=600"
              alt="Fitness motivation"
              width={600}
              height={400}
              objectFit="cover"
              borderRadius="md" // Added border radius for a smoother look
            />
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
