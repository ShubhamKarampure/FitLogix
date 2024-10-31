import React from 'react';
import { Box, Heading, Text, Flex, VStack, Button, Image } from '@chakra-ui/react';

const MealTrackingSection = () => {
  return (
    <Box bg="white" p={8} borderRadius="md" boxShadow="md" my={8}>
      <Heading as="h2" size="xl" textAlign="center" mb={4}>
        How Meal Tracking Works
      </Heading>
      <Text fontSize="lg" textAlign="center" mb={6}>
        Easily log and manage your meals to stay on track with your fitness goals.
      </Text>
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-around" mb={8}>
        <VStack spacing={4} flex={1}>
          <Heading as="h3" size="lg" color="teal.500">
            Step 1: Log Your Meals
          </Heading>
          <Text>
            Enter the details of your meals, including ingredients, portion sizes, and any notes.
          </Text>
        </VStack>
        <VStack spacing={4} flex={1}>
          <Heading as="h3" size="lg" color="teal.500">
            Step 2: Track Nutritional Information
          </Heading>
          <Text>
            Automatically calculate calories, macros, and nutritional values based on your entries.
          </Text>
        </VStack>
        <VStack spacing={4} flex={1}>
          <Heading as="h3" size="lg" color="teal.500">
            Step 3: Review Your Progress
          </Heading>
          <Text>
            Visualize your daily intake and see how it aligns with your fitness goals over time.
          </Text>
        </VStack>
      </Flex>
      <Box textAlign="center" mb={4}>
        <Image
          src="https://via.placeholder.com/300" // Replace with an actual image URL showing meal tracking
          alt="Meal Tracking Example"
          borderRadius="md"
          boxShadow="md"
        />
      </Box>
      <Button colorScheme="teal" size="lg" mt={4}>
        Start Tracking Your Meals
      </Button>
    </Box>
  );
};

export default MealTrackingSection;
