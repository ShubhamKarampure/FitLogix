import React from 'react';
import { Box, Heading, Text, Badge, Flex } from '@chakra-ui/react';
import { useUser } from '../../context/userContext';
// Define the color to use for the borders
const orangeColor = 'orange.300'; // You can customize this as needed

const FitnessGoals = () => {
  const { user } = useUser();
  return (
    <Box>
      <Heading as="h3" size="md" mb={4}>
        Fitness Goals
      </Heading>
      <Box>
        <Box
          borderLeftWidth={4}
          borderLeftColor={orangeColor}
          pl={2}
          mb={2}
        >
          <Text fontWeight="semibold">Weight Loss</Text>
          <Text fontSize="sm" color="gray.500">
            Goal: 15 lbs by September
          </Text>
        </Box>
        <Box
          borderLeftWidth={4}
          borderLeftColor={orangeColor}
          pl={2}
          mb={2}
        >
          <Text fontWeight="semibold">Muscle Gain</Text>
          <Text fontSize="sm" color="gray.500">
            Goal: Increase bench press by 20 lbs
          </Text>
        </Box>
      </Box>
      <Box mt={4}>
        <Heading as="h4" size="sm" mb={2}>
          Activity Preferences
        </Heading>
        <Flex wrap="wrap" gap={2}>
          <Badge variant="outline">Running</Badge>
          <Badge variant="outline">Strength Training</Badge>
          <Badge variant="outline">Yoga</Badge>
        </Flex>
      </Box>
    </Box>
  );
}
export default FitnessGoals;
