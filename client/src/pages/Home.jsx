import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  VStack,
  HStack,
  Image,
  Link,
  Icon,
} from '@chakra-ui/react';
import { FaDumbbell, FaLeaf, FaHeart, FaChartLine, FaUsers } from 'react-icons/fa';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

export default function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // State for controlling the login overlay
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // State for controlling the Register overlay

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const handleRegisterOpen = () => {
    setIsRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setIsRegisterOpen(false);
  };

  return (
    <Box position="relative">
      <Box bg={useColorModeValue('white', 'gray.800')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box fontWeight="bold" fontSize="xl">FitTrack</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <NavLink>Home</NavLink>
              <NavLink>Features</NavLink>
              <NavLink>Pricing</NavLink>
              <NavLink>About</NavLink>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              bg={'green.400'}
              color={'white'}
              size={'sm'}
              mr={4}
              onClick={handleLoginOpen} // Open login overlay
              _hover={{ bg: 'green.500' }}
            >
              Log In
            </Button>
            <Button
              variant={'outline'}
              color={'black'}
              size={'sm'}
              mr={4}
              onClick={handleRegisterOpen} // Open Register overlay
              _hover={{ bg: 'green.500' }}
            >
              Sign Up
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Container maxW={'7xl'} px={{ base: 6, md: 10 }}>
        {/* Landing page content */}
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
              <Text as={'span'} position={'relative'}>
                Log Your Workouts & Meals,
              </Text>
              <br />
              <Text as={'span'} color={'green.400'}>
                Track Your Progress
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              FitTrack helps you stay on top of your fitness journey. Log workouts, meals, and receive personalized health tips to keep you motivated and informed.
            </Text>
            <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme={'green'}
                bg={'green.400'}
                _hover={{ bg: 'green.500' }}
              >
                Get started
              </Button>
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                leftIcon={<FaChartLine />}
              >
                How it works
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}
          >
            <Box
              position={'relative'}
              height={'300px'}
              rounded={'2xl'}
              boxShadow={'2xl'}
              width={'full'}
              overflow={'hidden'}
            >
              <Image
                alt={'Hero Image'}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={'100%'}
                src={'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'}
              />
            </Box>
          </Flex>
        </Stack>

        {/* Features Section */}
        <Stack py={10} direction={{ base: 'column', md: 'row' }} spacing={10}>
          <VStack align={'start'}>
            <Icon as={FaDumbbell} w={10} h={10} color="blue.400" />
            <Heading size="md">Workout Logging</Heading>
            <Text color={'gray.500'}>Easily log your workouts with type, duration, and calories burned.</Text>
          </VStack>
          <VStack align={'start'}>
            <Icon as={FaLeaf} w={10} h={10} color="green.400" />
            <Heading size="md">Meal Logging</Heading>
            <Text color={'gray.500'}>Track your meals, get nutritional breakdowns, and manage your diet.</Text>
          </VStack>
          <VStack align={'start'}>
            <Icon as={FaHeart} w={10} h={10} color="red.400" />
            <Heading size="md">Progress Tracking</Heading>
            <Text color={'gray.500'}>Visualize your progress with charts for workouts and meals over time.</Text>
          </VStack>
          <VStack align={'start'}>
            <Icon as={FaUsers} w={10} h={10} color="purple.400" />
            <Heading size="md">Health Tips</Heading>
            <Text color={'gray.500'}>Access expert health tips and articles to support your fitness journey.</Text>
          </VStack>
        </Stack>
      </Container>

      {/* Overlay for Login */}
      {isLoginOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.7)" // Semi-transparent background
          zIndex={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Login closeLogin={handleLoginClose} /> {/* Pass closeLogin prop */}
        </Box>

        
      )}

    {/* Overlay for Register */}
    {isRegisterOpen && (
    <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.7)" // Semi-transparent background
        zIndex={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
    >
        <Register closeRegister={handleRegisterClose} /> {/* Pass closeRegister prop */}
    </Box>
    )}

    </Box>
  );
}
