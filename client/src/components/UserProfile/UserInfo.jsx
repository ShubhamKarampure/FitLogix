import React from 'react';
import { Avatar, Button, Box, Heading, Text, Flex } from '@chakra-ui/react';
import { useUser } from '../../context/userContext';
import profileService from '../../services/profileService';
const UserInfo = () => {
  const { refreshUser } = useUser();
  const { user } = useUser();

  const updateProfile = async () => {
    try {
            const response = await profileService.createProfile(profile);
            console.log('Profile created successfully:', response);
            await refreshUser();
        } catch (error) {
            console.error('Error creating profile:', error);
        }
  }
  return (
    <Box mt={12}>
      
        <Flex direction="column" align="center">
          <Box position="relative">
            <Avatar
              size="2xl"
            name={user.profile.name}
            src={user.profile.avatar}
              border="4px solid"
              borderColor="orange.300" // Updated border color
            />
            <Button
              as="label"
              htmlFor="profile-upload"
              position="absolute"
              bottom={0}
              right={0}
              rounded="full"
              size="sm"
              bg="orange.300" // Updated background color
              _hover={{ bg: 'orange.400' }} // Updated hover color
            >
              <Box
                as="svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                width={4}
                height={4}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </Box>
            </Button>
          <input onSubmit={updateProfile} id="profile-upload" type="file" hidden accept="image/*" />
          </Box>
          <Heading as="h2" size="xl" mt={4}>
            {user.profile.name}
          </Heading>
        <Text color="gray.500">{user.email}</Text>
          <Text
            mt={4}
            textAlign="center"
            maxWidth="md"
            borderLeftWidth={4}
            borderLeftColor="orange.300" // Updated left border color
            pl={4}
            fontStyle="italic"
          >
            "Striving for progress, not perfection. Every step counts!"
          </Text>
        </Flex>
    </Box>
  );
};

export default UserInfo;
