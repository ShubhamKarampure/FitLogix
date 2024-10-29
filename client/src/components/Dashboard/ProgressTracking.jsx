import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the progress chart
const progressData = [
  { name: 'Week 1', weight: 180, workouts: 3, meals: 15 },
  { name: 'Week 2', weight: 178, workouts: 4, meals: 18 },
  { name: 'Week 3', weight: 176, workouts: 5, meals: 20 },
  { name: 'Week 4', weight: 174, workouts: 4, meals: 21 },
];

const ProgressTracking = () => {
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mt={6}>
      <Heading size="lg" mb={4}>Progress Tracking</Heading>
      <Box h="300px">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#000000" />
            <Line type="monotone" dataKey="workouts" stroke="#FFA500" />
            <Line type="monotone" dataKey="meals" stroke="#FF4500" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default ProgressTracking;
