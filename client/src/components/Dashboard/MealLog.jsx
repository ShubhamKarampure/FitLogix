import React from 'react';
import { Box, Heading, Grid, VStack, HStack, Text, Flex, Image, Button } from '@chakra-ui/react';
import { FiTarget, FiPlus } from 'react-icons/fi';

const MealLog = () => {
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mt={6}>
      <Heading size="lg" mb={4}>Meal Log</Heading>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <VStack align="stretch">
          <Heading size="md" mb={2}>Today's Meals</Heading>
          <VStack align="stretch" spacing={2}>
            <HStack>
              <Box as={FiTarget} color="orange.500" />
              <Text>Breakfast: Oatmeal with fruits (300 cal)</Text>
            </HStack>
            <HStack>
              <Box as={FiTarget} color="orange.500" />
              <Text>Lunch: Grilled chicken salad (450 cal)</Text>
            </HStack>
            <HStack>
              <Box as={FiTarget} color="orange.500" />
              <Text>Snack: Greek yogurt with nuts (200 cal)</Text>
            </HStack>
          </VStack>
        </VStack>
        <Flex justifyContent="center" alignItems="center">
          <Box maxW={{ base: "100%", md: "300px" }} overflow="hidden" borderRadius="lg">
            <Image
              src="https://images.immediate.co.uk/production/volatile/sites/30/2022/02/Chicken-leek-and-brown-rice-stir-fry-7a2dde9.jpg"
              alt="Healthy Food Illustration"
              objectFit="cover"
              width="100%"
              height="auto"
            />
          </Box>
        </Flex>
      </Grid>
      <Button leftIcon={<FiPlus />} colorScheme="orange" mt={4}>
        Add New Meal
      </Button>
    </Box>
  );
};

export default MealLog;
