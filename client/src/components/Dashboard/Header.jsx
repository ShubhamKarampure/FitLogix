import React from 'react';
import { Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';

const Header = ({ userName }) => {
  return (
    <Flex as="header" bg="brand.black" color="brand.white" p={4} alignItems="center" mt={3}>
      <Heading size="lg" fontWeight="bold">
        Welcome, {userName}
      </Heading>
    </Flex>
  );
};

export default Header;
