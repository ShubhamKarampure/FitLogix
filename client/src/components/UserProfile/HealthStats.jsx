import React from 'react';
import { Box, Heading, Text, Flex, Grid } from '@chakra-ui/react';
import { useUser } from '../../context/userContext';
const HealthStats = ({ orangeColor }) => {
  
  const { user } = useUser();
  
  const heightInFeetAndInches = (cm) => {
  const totalInches = cm / 2.54; // Convert cm to total inches
  const feet = Math.floor(totalInches / 12); // Calculate feet
  const inches = Math.round(totalInches % 12); // Calculate remaining inches
  return `${feet}'${inches}`; // Format as feet'inches
  };

  const BMI = (weight, height) => {
    let heightInMeter = height / 100;
    return (weight / (heightInMeter*heightInMeter)).toFixed(2)
  }


  return (
    <Box>
      <Heading as="h3" size="md" mb={4}>
        Health Stats
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Age
          </Text>
          <Text fontWeight="semibold">{ user.profile.age}</Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Gender
          </Text>
          <Text fontWeight="semibold">{ user.profile.gender}</Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Height
          </Text>
          <Text fontWeight="semibold">{heightInFeetAndInches(user.profile.height)}</Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Weight
          </Text>
          <Text fontWeight="semibold">{user.profile.weight} kg</Text>
        </Box>
      </Grid>
      <Box mt={4}>
        <Box
          borderWidth={1}
          borderColor={orangeColor}
          borderRadius="md"
          p={2}
          mb={2}
        >
          <Text fontSize="sm" color="gray.500">
            BMI
          </Text>
          <Text fontWeight="semibold">{BMI(user.profile.weight,user.profile.height)}</Text>
        </Box>
        <Box
          borderWidth={1}
          borderColor={orangeColor}
          borderRadius="md"
          p={2}
        >
          <Text fontSize="sm" color="gray.500">
            Body Fat %
          </Text>
          <Text fontWeight="semibold">18%</Text>
        </Box>
      </Box>
      <Flex mt={4} gap={4}>
        <Flex align="center" gap={2}>
          <Box
            as="svg"
            fill="none"
            stroke={orangeColor}
            viewBox="0 0 24 24"
            width={6}
            height={6}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">
              Heart Rate
            </Text>
            <Text fontWeight="semibold">72 bpm</Text>
          </Box>
        </Flex>
        <Flex align="center" gap={2}>
          <Box
            as="svg"
            fill="none"
            stroke={orangeColor}
            viewBox="0 0 24 24"
            width={6}
            height={6}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">
              Blood Pressure
            </Text>
            <Text fontWeight="semibold">120/80</Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
};

export default HealthStats;
