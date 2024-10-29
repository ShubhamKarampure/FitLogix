import React from 'react';
import { Box, Text, Button, Stack } from '@chakra-ui/react';

const ProfileGoals = ({ userProfile, onEditProfile, onEditGoals }) => (
  <Box p="4" borderWidth="1px" borderRadius="md" bg="gray.50" mt={6}>
    <Text fontSize="xl" mb="4">Profile & Goals</Text>
    <Stack spacing="4">
      <Box>
        <Text><strong>Username:</strong> {userProfile.username}</Text>
        <Text><strong>Goal Weight:</strong> {userProfile.goalWeight} kg</Text>
        <Text><strong>Daily Caloric Goal:</strong> {userProfile.dailyCalories} kcal</Text>
      </Box>
      <Button colorScheme="orange" onClick={onEditProfile}>Edit Profile</Button>
      <Button colorScheme="orange" onClick={onEditGoals}>Set Goals</Button>
    </Stack>
  </Box>
);

export default ProfileGoals;
