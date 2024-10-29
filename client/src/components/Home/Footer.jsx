import React from 'react';
import { Box, Container, Text, Link, Stack, Icon } from '@chakra-ui/react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray.100 mt-auto">
      <Container maxW="container.xl" py={6} display="flex" flexDirection={{ base: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
        <Text fontSize="sm" color="gray.600" mb={{ base: 4, md: 0 }}>
          © 2024 FitTrack. All rights reserved.
        </Text>
        <Stack direction="row" spacing={4}>
          <Link href="/privacy" fontSize="sm" color="gray.600" _hover={{ color: "orange.400" }}>
            Privacy Policy
          </Link>
          <Link href="#" color="gray.600" _hover={{ color: "orange.400" }}>
            <Icon as={FaFacebookF} boxSize={5} />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" color="gray.600" _hover={{ color: "orange.400" }}>
            <Icon as={FaTwitter} boxSize={5} />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" color="gray.600" _hover={{ color: "orange.400" }}>
            <Icon as={FaInstagram} boxSize={5} />
            <span className="sr-only">Instagram</span>
          </Link>
        </Stack>
      </Container>
    </footer>
  );
};

export default Footer;
