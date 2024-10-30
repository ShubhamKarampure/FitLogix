import React from 'react'
import { Box, Heading, Progress, Text } from '@chakra-ui/react'

const NutritionHydration = () => (
  <Box borderWidth={1} borderRadius="lg" p={6}>
    <Heading as="h3" size="md" mb={4}>Nutrition & Hydration</Heading>
    <Box mb={4}>
      <Heading as="h4" size="sm" mb={2}>Calorie Intake</Heading>
      <Progress value={75} colorScheme="orange" />
      <Text fontSize="sm" color="gray.500">1,500 / 2,000 kcal</Text>
    </Box>
  </Box>
)

export default NutritionHydration
