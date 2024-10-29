import React from 'react';
import { Box, Heading, Grid, Image, Text } from '@chakra-ui/react';

const HealthTips = () => {
  const tips = [
    {
      title: 'Stay Hydrated',
      description: 'Drinking water helps maintain body fluid balance, boosts energy, and improves skin health.',
      image: 'https://static.wixstatic.com/media/d1b1e3_ff4cd9a2c7ef463ab16fba35edaf656c~mv2.webp',
    },
    {
      title: 'Get Enough Sleep',
      description: 'Aim for 7-9 hours of sleep to support mental and physical health, improve immunity, and enhance focus.',
      image: 'https://media.istockphoto.com/id/1326080733/photo/handsome-young-man-sleeping-in-bed.jpg?s=612x612&w=0&k=20&c=208PpDwIhZvgJ2coNFMJzN6fJJwxsn0ZOYli0-84aS8=',
    },
    {
      title: 'Exercise Regularly',
      description: 'Regular physical activity enhances cardiovascular health, strengthens muscles, and uplifts mood.',
      image: 'https://www.verywellfit.com/thmb/Xio5I7FgQh0GRwhS6qWAio3amOM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Pushups-5680bb925f9b586a9edf3927.jpg',
    },
  ];

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mt={6}>
      <Heading size="lg" mb={4}>Health Tips</Heading>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }} gap={4}>
        {tips.map((tip, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={tip.image} alt={`Health Tip ${index + 1}`} objectFit="cover" width="100%" height="200px" />
            <Box p={4}>
              <Heading size="md" mb={2}>{tip.title}</Heading>
              <Text>{tip.description}</Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default HealthTips;
