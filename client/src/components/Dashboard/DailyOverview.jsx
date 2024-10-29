import React from 'react';
import { Box, Heading, Grid, GridItem, HStack, VStack, Text } from '@chakra-ui/react';
import { FiActivity, FiTarget, FiClock } from 'react-icons/fi';

const DailyOverview = () => {
  return (
    <Box bg="white" p={8} borderRadius="lg" boxShadow="md" mt={6} mb={6}> {/* Adjust top padding */}
      <Heading size="lg" mb={4}>Daily Overview</Heading>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
        <GridItem p={4} bg="orange.100" borderRadius="lg">
          <HStack>
            <Box as={FiActivity} color="orange.500" boxSize={10} />
            <VStack align="start">
              <Text fontSize="sm" color="gray.600">Calories Burned</Text>
              <Text fontSize="xl" fontWeight="bold">450</Text>
            </VStack>
          </HStack>
        </GridItem>
        <GridItem p={4} bg="orange.100" borderRadius="lg">
          <HStack>
            <Box as={FiTarget} color="orange.500" boxSize={10} />
            <VStack align="start">
              <Text fontSize="sm" color="gray.600">Calories Consumed</Text>
              <Text fontSize="xl" fontWeight="bold">1800</Text>
            </VStack>
          </HStack>
        </GridItem>
        <GridItem p={4} bg="orange.100" borderRadius="lg">
          <HStack>
            <Box as={FiClock} color="orange.500" boxSize={10} />
            <VStack align="start">
              <Text fontSize="sm" color="gray.600">Total Workout Time</Text>
              <Text fontSize="xl" fontWeight="bold">45 mins</Text>
            </VStack>
          </HStack>
        </GridItem>
        <GridItem p={4} bg="orange.100" borderRadius="lg">
          <HStack>
            <Box as={FiTarget} color="orange.500" boxSize={10} />
            <VStack align="start">
              <Text fontSize="sm" color="gray.600">Remaining Goal</Text>
              <Text fontSize="xl" fontWeight="bold">500 cal</Text>
            </VStack>
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DailyOverview;
