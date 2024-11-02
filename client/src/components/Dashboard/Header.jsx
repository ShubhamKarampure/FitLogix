import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { Star, Smile } from 'lucide-react'; // Import icons for a more exciting visual


const Header = ({ name }) => {

  return (
    <Flex
      as="header"
      bg="brand.black"
      color="brand.white"
      p={4}
      alignItems="center"
      justifyContent="space-between" // Space between elements
      mt={3}
    >
      <Flex alignItems="center">
        <Star className="text-yellow-400" size={28} /> {/* Star icon for excitement */}
        <Heading size="lg" fontWeight="bold" ml={2}>
          Welcome, {name}!
        </Heading>
      </Flex>
      <Text fontSize="lg" fontWeight="medium" color="gray.300" textAlign="right">
        🌟 Let's make today amazing! <Smile className="inline" size={20} />
      </Text>
    </Flex>
  );
};

export default Header;
