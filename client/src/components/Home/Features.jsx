import React from 'react';
import { Box, SimpleGrid, Heading, Text, Icon, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { FaDumbbell, FaLeaf, FaHeart, FaChartLine, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Create a motion variant for the cards
const MotionCard = motion(Card);

const features = [
  {
    icon: FaDumbbell,
    title: 'Workout Logging',
    description: 'Easily log and track your workouts with our intuitive interface.',
  },
  {
    icon: FaLeaf,
    title: 'Meal Tracking',
    description: 'Keep track of your nutrition with our comprehensive meal logger.',
  },
  {
    icon: FaHeart,
    title: 'Progress Monitoring',
    description: 'Visualize your fitness journey with detailed progress charts.',
  },
  {
    icon: FaUsers,
    title: 'Health Tips',
    description: 'Get personalized health advice tailored to your needs.',
  },
];

const Features = () => {
  return (
    <Box py={12} bg="white">
      <Heading as="h2" size="3xl" textAlign="center" mb={8}>
        Our Features
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6}>
        {features.map((feature, index) => (
          <MotionCard
            key={index}
            borderWidth={1}
            borderColor="orange.400"
            borderRadius="md"
            boxShadow="md"
            initial={{ opacity: 0, scale: 0.8 }} // Start with hidden and small
            animate={{ opacity: 1, scale: 1 }} // Animate to visible and normal size
            transition={{ duration: 0.5 }} // Animation duration
          >
            <CardHeader textAlign="center">
              {/* Increase the icon size here */}
              <Icon as={feature.icon} w={12} h={12} color="orange.400" className="mb-2" />
              <Heading size="md" color="black">
                {feature.title}
              </Heading>
            </CardHeader>
            <CardBody textAlign="center">
              <Text color="gray.700">{feature.description}</Text>
            </CardBody>
          </MotionCard>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Features;
