import React from 'react';
import {
  Box,
  Heading,
  VStack,
  Flex,
  Text,
  Button,
  Divider,
} from '@chakra-ui/react';

export default function MealHistory() {
  return (
    <Box borderWidth={1} borderRadius="lg" p={6}>
      <Heading as="h2" size="lg" mb={4}>Logged Meals History</Heading>
      <VStack spacing={4} align="stretch">
        {['Breakfast', 'Lunch', 'Dinner'].map((meal, index) => (
          <React.Fragment key={meal}>
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="bold">{meal}</Text>
              </Box>
              <Box>
                <Button colorScheme="blue" size="sm">View</Button>
              </Box>
            </Flex>
            <Divider />
          </React.Fragment>
        ))}
      </VStack>
    </Box>
  );
}
