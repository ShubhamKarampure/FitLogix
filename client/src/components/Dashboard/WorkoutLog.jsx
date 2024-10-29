import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

const WorkoutLog = () => {
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <Heading size="lg" mb={4}>Workout Log</Heading>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr bg="orange.500">
              <Th color="white">Date</Th>
              <Th color="white">Type</Th>
              <Th color="white">Duration</Th>
              <Th color="white">Calories Burned</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>2023-05-01</Td>
              <Td>Running</Td>
              <Td>30 mins</Td>
              <Td>300</Td>
            </Tr>
            <Tr>
              <Td>2023-05-02</Td>
              <Td>Weight Training</Td>
              <Td>45 mins</Td>
              <Td>200</Td>
            </Tr>
            <Tr>
              <Td>2023-05-03</Td>
              <Td>Yoga</Td>
              <Td>60 mins</Td>
              <Td>150</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Button leftIcon={<FiPlus />} colorScheme="orange" mt={4}>
        Add New Workout
      </Button>
    </Box>
  );
};

export default WorkoutLog;
