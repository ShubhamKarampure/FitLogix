import React, { useEffect, useState, useRef } from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';

// Example data for daily workout sessions
const dailyWorkoutData = [
  { day: 'Mon', sessions: 1 },
  { day: 'Tue', sessions: 2 },
  { day: 'Wed', sessions: 3 },
  { day: 'Thu', sessions: 2 },
  { day: 'Fri', sessions: 4 },
  { day: 'Sat', sessions: 3 },
  { day: 'Sun', sessions: 1 },
];

// Example data for weekly calories burned
const weeklyCaloriesData = [
  { week: 'Week 1', calories: 1500 },
  { week: 'Week 2', calories: 1800 },
  { week: 'Week 3', calories: 2100 },
  { week: 'Week 4', calories: 2500 },
  { week: 'Week 5', calories: 2300 },
];

const TrackYourProgress = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Adjust this value to control when the animation triggers
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  const chartVariants = {
    hidden: { opacity: 0, translateY: 20 },
    visible: { opacity: 1, translateY: 0 },
  };

  return (
    <Box ref={ref} py={12} bg="white">
      <Heading as="h2" size="3xl" textAlign="center" mb={8}>
        Track Your Fitness Progress
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {/* Line Chart for Daily Workout Sessions */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={chartVariants}
          transition={{ duration: 0.5 }} // Duration for the animation
        >
          <Box p={4} borderWidth={1} borderColor="orange.400" borderRadius="md" boxShadow="md">
            <Heading size="md" textAlign="center" mb={4}>
              Daily Workout Sessions
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyWorkoutData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sessions" stroke="#FFA500" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </motion.div>

        {/* Bar Chart for Weekly Calories Burned */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={chartVariants}
          transition={{ duration: 0.5 }} // Duration for the animation
        >
          <Box p={4} borderWidth={1} borderColor="orange.400" borderRadius="md" boxShadow="md">
            <Heading size="md" textAlign="center" mb={4}>
              Weekly Calories Burned
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyCaloriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#FFA500">
                  {weeklyCaloriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#FF8C00" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </motion.div>
      </SimpleGrid>
    </Box>
  );
};

export default TrackYourProgress;
