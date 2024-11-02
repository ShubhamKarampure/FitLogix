import React, { useState } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Avatar,
  Button,
  Badge,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import UserInfo from "../components/UserProfile/UserInfo";
import FitnessGoals from "../components/UserProfile/FitnessGoals";
import HealthStats from "../components/UserProfile/HealthStats";

const ProfilePage = () => {
  const progressData = [
    { name: "Jan", weight: 180 },
    { name: "Feb", weight: 178 },
    { name: "Mar", weight: 176 },
    { name: "Apr", weight: 174 },
    { name: "May", weight: 172 },
    { name: "Jun", weight: 170 },
  ];

  const orangeColor = useColorModeValue("orange.500", "orange.300");

  return (
            <>
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            {/* User Information */}
            <Box
              gridColumn={{ md: "span 3" }}
              borderWidth={1}
              borderRadius="lg"
              p={6}
              >
              <UserInfo />
            </Box>

            {/* Fitness Goals and Preferences */}
            <Box borderWidth={1} borderRadius="lg" p={6}>
              <FitnessGoals />
            </Box>

            {/* Health and Physical Stats */}
            <Box borderWidth={1} borderRadius="lg" p={6}>
              <HealthStats />
            </Box>

            {/* Progress and Milestones */}
            <Box
              gridColumn={{ md: "span 3" }}
              borderWidth={1}
              borderRadius="lg"
              p={6}
              >
              <Heading as="h3" size="md" mb={4}>
                Progress
              </Heading>
              <Box height="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke={orangeColor}
                      strokeWidth={2}
                      />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <Box mt={6}>
                <Heading as="h4" size="sm" mb={2}>
                  Milestones
                </Heading>
                <Flex wrap="wrap" gap={2}>
                  <Badge colorScheme="orange">Fastest Mile</Badge>
                  <Badge colorScheme="orange">Heaviest Lift</Badge>
                  <Badge colorScheme="orange">30-Day Streak</Badge>
                </Flex>
              </Box>
            </Box>

            {/* Workout History */}
            <Box
              gridColumn={{ md: "span 2" }}
              borderWidth={1}
              borderRadius="lg"
              p={6}
              >
              <Heading as="h3" size="md" mb={4}>
                Workout History
              </Heading>
              <Tabs>
                <TabList>
                  <Tab>Recent</Tab>
                  <Tab>Summary</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Date</Th>
                          <Th>Type</Th>
                          <Th>Duration</Th>
                          <Th>Calories</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>Jun 15</Td>
                          <Td>Running</Td>
                          <Td>45 min</Td>
                          <Td>450</Td>
                        </Tr>
                        <Tr>
                          <Td>Jun 14</Td>
                          <Td>Strength</Td>
                          <Td>60 min</Td>
                          <Td>320</Td>
                        </Tr>
                        <Tr>
                          <Td>Jun 12</Td>
                          <Td>Yoga</Td>
                          <Td>30 min</Td>
                          <Td>150</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TabPanel>
                  <TabPanel>
                    <Box>
                      <Text>Total Workouts: 15</Text>
                      <Text>Average Duration: 50 min</Text>
                      <Text>Total Calories Burned: 5,600</Text>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>

            {/* Nutrition and Hydration */}
            <Box borderWidth={1} borderRadius="lg" p={6}>
              <Heading as="h3" size="md" mb={4}>
                Nutrition & Hydration
              </Heading>
              <Box mb={4}>
                <Heading as="h4" size="sm" mb={2}>
                  Calorie Intake
                </Heading>
                <Progress value={75} colorScheme="orange" />
                <Text fontSize="sm" color="gray.500" mt={1}>
                  1,500 / 2,000 kcal
                </Text>
              </Box>
              <Box mb={4}>
                <Heading as="h4" size="sm" mb={2}>
                  Macronutrients
                </Heading>
                <Flex gap={2}>
                  <Progress value={30} colorScheme="orange" flex={1} />
                  <Progress value={50} colorScheme="orange" flex={1} />
                  <Progress value={20} colorScheme="orange" flex={1} />
                </Flex>
                <Flex
                  justify="space-between"
                  fontSize="sm"
                  color="gray.500"
                  mt={1}
                  >
                  <Text>Protein</Text>
                  <Text>Carbs</Text>
                  <Text>Fat</Text>
                </Flex>
              </Box>
              <Box>
                <Heading as="h4" size="sm" mb={2}>
                  Water Intake
                </Heading>
                <Flex align="center" gap={2}>
                  <Box
                    as="svg"
                    fill="none"
                    stroke={orangeColor}
                    viewBox="0 0 24 24"
                    width={6}
                    height={6}
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                  </Box>
                  <Progress value={60} colorScheme="orange" flex={1} />
                </Flex>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  1.5 / 2.5 L
                </Text>
              </Box>
            </Box>

            {/* Achievements and Badges */}
            <Box
              gridColumn={{ md: "span 3" }}
              borderWidth={1}
              borderRadius="lg"
              p={6}
              >
              <Heading as="h3" size="md" mb={4}>
                Achievements
              </Heading>
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                  lg: "repeat(6, 1fr)",
                }}
                gap={4}
                >
                {[...Array(6)].map((_, i) => (
                  <Flex key={i} direction="column" align="center">
                    <Flex
                      w={16}
                      h={16}
                      bg="orange.100"
                      rounded="full"
                      align="center"
                      justify="center"
                      mb={2}
                      >
                      <Box
                        as="svg"
                        fill="none"
                        stroke={orangeColor}
                        viewBox="0 0 24 24"
                        width={8}
                        height={8}
                        >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4M7.835  4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                      </Box>
                    </Flex>
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      textAlign="center"
                      >
                      Achievement {i + 1}
                    </Text>
                  </Flex>
                ))}
              </Grid>
            </Box>

            {/* Community and Social Connections */}
            <Box
              gridColumn={{ md: "span 2" }}
              borderWidth={1}
              borderRadius="lg"
              p={6}
              >
              <Heading as="h3" size="md" mb={4}>
                Community
              </Heading>
              <Box mb={4}>
                <Heading as="h4" size="sm" mb={2}>
                  Friends
                </Heading>
                <Flex>
                  {[...Array(5)].map((_, i) => (
                    <Avatar
                    key={i}
                    name={`User ${i + 1}`}
                    src={`/placeholder.svg?height=32&width=32&text=${i + 1}`}
                    ml={i > 0 ? -2 : 0}
                    border="2px solid"
                    borderColor="white"
                    />
                  ))}
                </Flex>
              </Box>
              <Box>
                <Heading as="h4" size="sm" mb={2}>
                  Groups
                </Heading>
                <Flex direction="column" gap={2}>
                  <Badge
                    variant="outline"
                    p={2}
                    display="flex"
                    justifyContent="space-between"
                    >
                    Morning Runners
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </Box>
                  </Badge>
                  <Badge
                    variant="outline"
                    p={2}
                    display="flex"
                    justifyContent="space-between"
                    >
                    Yoga Enthusiasts
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </Box>
                  </Badge>
                </Flex>
              </Box>
            </Box>

            {/* Settings and Privacy */}
            <Box borderWidth={1} borderRadius="lg" p={6}>
              <Heading as="h3" size="md" mb={4}>
                Settings
              </Heading>
              <Flex direction="column" gap={2}>
                <Button
                  variant="outline"
                  justifyContent="flex-start"
                  leftIcon={
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </Box>
                  }
                  >
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  justifyContent="flex-start"
                  leftIcon={
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </Box>
                  }
                  >
                  Adjust Goals
                </Button>
                <Button
                  variant="outline"
                  justifyContent="flex-start"
                  leftIcon={
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </Box>
                  }
                  >
                  Privacy Settings
                </Button>
              </Flex>
            </Box>

            {/* Subscription/Account Information */}
            <Box
              gridColumn={{ md: "span 3" }}
              borderWidth={1}
              borderRadius="lg"
              p={6}
              >
              <Heading as="h3" size="md" mb={4}>
                Subscription
              </Heading>
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontWeight="semibold">Premium Plan</Text>
                  <Text fontSize="sm" color="gray.500">
                    Billed annually
                  </Text>
                </Box>
                <Button
                  colorScheme="orange"
                  leftIcon={
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
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                    </Box>
                  }
                  >
                  Upgrade
                </Button>
              </Flex>
            </Box>
          </Grid>
          </>
        );
};

export default ProfilePage;
