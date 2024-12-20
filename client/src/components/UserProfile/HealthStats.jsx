import { React, useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Grid,
  HStack,
  VStack,
  Center,
} from "@chakra-ui/react";
import { useUser } from "../../context/userContext";
import "./HeartRateComponent.css"; // For the heart icon and spinner styles

const HeartRateComponent = ({orangeColor}) => {
  const [heartRate, setHeartRate] = useState(80);
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [loading, setLoading] = useState(true);

  return (
    <div className="heart-rate-display">
      <HStack justify="center">
          <Box
        borderWidth={1}
        borderColor={orangeColor}
        borderRadius="md"
        p={2}
          mt={2}
           width="120px"
          height="120px"
        >
            <VStack>
          <h1>Heart Rate</h1>
          <div className="heart">
            {/* Fun heart icon animation */}
            ❤️
          </div>
          <h1> {heartRate !== null ? heartRate : "80"}</h1>
        </VStack>
        </Box>
        <Box
        borderWidth={1}
        borderColor={orangeColor}
        borderRadius="md"
        p={2}
          mt={2}
          width="120px"
          height="120px"
        >

        <VStack>
          <h1>BP</h1>
          <div>
            {/* Fun heart icon animation */}
            <Text fontSize="20px">🩸</Text>
          </div>
          <h2>{`${systolic}/${diastolic}`}</h2>
        </VStack>
        </Box>
      </HStack>
    </div>
  );
};

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
    return (weight / (heightInMeter * heightInMeter)).toFixed(2);
  };

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
          <Text fontWeight="semibold">{user.profile.age}</Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Gender
          </Text>
          <Text fontWeight="semibold">{user.profile.gender}</Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Height
          </Text>
          <Text fontWeight="semibold">
            {heightInFeetAndInches(user.profile.height)}
          </Text>
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
          <Text fontWeight="semibold">
            {BMI(user.profile.weight, user.profile.height)}
          </Text>
        </Box>
        <Box borderWidth={1} borderColor={orangeColor} borderRadius="md" p={2}>
          <Text fontSize="sm" color="gray.500">
            Body Fat %
          </Text>
          <Text fontWeight="semibold">18%</Text>
        </Box>
      </Box>

      <Box
        borderWidth={1}
        borderColor={orangeColor}
        borderRadius="md"
        p={2}
        mt={2}
      >
        <HeartRateComponent orangeColor={orangeColor} />
      </Box>
    </Box>
  );
};

export default HealthStats;
