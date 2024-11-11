import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Select,
  Button,
  useTheme,
} from '@chakra-ui/react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { CalendarIcon, ActivityIcon, HeartIcon, ScaleIcon, TrendingUpIcon } from 'lucide-react';

// Mock data (same as before)
const weightData = [
  { date: "2023-01-01", weight: 80 },
  { date: "2023-02-01", weight: 79 },
  { date: "2023-03-01", weight: 78.5 },
  { date: "2023-04-01", weight: 77 },
  { date: "2023-05-01", weight: 76.5 },
  { date: "2023-06-01", weight: 75 },
];

const workoutData = [
  { date: "2023-05-01", duration: 45 },
  { date: "2023-05-02", duration: 60 },
  { date: "2023-05-03", duration: 30 },
  { date: "2023-05-04", duration: 45 },
  { date: "2023-05-05", duration: 75 },
  { date: "2023-05-06", duration: 60 },
  { date: "2023-05-07", duration: 90 },
];

const caloriesData = [
  { date: "2023-05-01", burned: 300, consumed: 2200 },
  { date: "2023-05-02", burned: 450, consumed: 2100 },
  { date: "2023-05-03", burned: 200, consumed: 2300 },
  { date: "2023-05-04", burned: 350, consumed: 2000 },
  { date: "2023-05-05", burned: 500, consumed: 2200 },
  { date: "2023-05-06", burned: 400, consumed: 2100 },
  { date: "2023-05-07", burned: 600, consumed: 2000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box bg="white" p={2} border="1px" borderColor="gray.200" borderRadius="md">
        <Text fontWeight="bold">{label}</Text>
        {payload.map((entry, index) => (
          <Text key={index} color={entry.color}>
            {`${entry.name}: ${entry.value}`}
          </Text>
        ))}
      </Box>
    );
  }
  return null;
};

export default function FitnessTracker() {
  const [timeRange, setTimeRange] = useState("week");
  const theme = useTheme();

  return (
    <Box minH="100vh" bg="white" color="black" p={8}>
      

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        <Stat>
          <StatLabel>Current Weight</StatLabel>
          <StatNumber>75 kg</StatNumber>
          <StatHelpText>
            <ScaleIcon style={{ display: 'inline', marginRight: '4px', color: theme.colors.orange[500] }} />
            -5 kg from start
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Workouts This Week</StatLabel>
          <StatNumber>5</StatNumber>
          <StatHelpText>
            <ActivityIcon style={{ display: 'inline', marginRight: '4px', color: theme.colors.orange[500] }} />
            +2 from last week
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Average Heart Rate</StatLabel>
          <StatNumber>72 bpm</StatNumber>
          <StatHelpText>
            <HeartIcon style={{ display: 'inline', marginRight: '4px', color: theme.colors.orange[500] }} />
            Resting heart rate
          </StatHelpText>
        </Stat>

        <Box gridColumn={{ md: 'span 2' }} p={4} borderWidth={1} borderRadius="lg">
          <Heading as="h3" size="md" mb={2}>Weight Progress</Heading>
          <Text fontSize="sm" color="gray.500" mb={4}>Your weight journey over time</Text>
          <Box h="300px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="weight" stroke={theme.colors.orange[500]} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="lg">
          <Heading as="h3" size="md" mb={2}>Workout Duration</Heading>
          <Text fontSize="sm" color="gray.500" mb={4}>Daily workout duration</Text>
          <Box h="300px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workoutData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="duration" fill={theme.colors.orange[500]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box gridColumn={{ md: 'span 2' }} p={4} borderWidth={1} borderRadius="lg">
          <Heading as="h3" size="md" mb={2}>Calories</Heading>
          <Text fontSize="sm" color="gray.500" mb={2}>Calories burned vs consumed</Text>
          <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} mb={4}>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </Select>
          <Box h="300px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={caloriesData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="burned" stroke={theme.colors.green[500]} strokeWidth={2} />
                <Line type="monotone" dataKey="consumed" stroke={theme.colors.red[500]} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
}