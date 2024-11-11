import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Wrap,
  WrapItem,
  Heading,
  Image,
  Text,
  Badge,
  HStack,
  Input,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  Modal,
  useToast,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  VStack,
  Progress,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useUser } from "../context/userContext";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SearchIcon } from "@chakra-ui/icons";
import { fetchData } from "../services/utils/fetchData";
import { RepeatIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { keyframes } from "@emotion/css";

const GLASS_SIZE = 250; // ml
const DAILY_GOAL = 2000; // ml
const STORAGE_KEY = "waterIntake";

const fillAnimation = keyframes`
  0% { height: 0%; }
  100% { height: var(--fill-height); }
`;

const WaterBottle = ({ fillPercentage }) => (
  <Box position="relative" width="12px" height="30px" margin="auto">
    <Box
      position="absolute"
      bottom="0"
      left="0"
      right="0"
      backgroundColor="blue.400"
      style={{ "--fill-height": `${fillPercentage}%` }}
      animation={`${fillAnimation} 0.5s ease-out forwards`}
    />
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      borderWidth="3px"
      borderColor="blue.500"
      borderRadius="full"
    />
  </Box>
);

const MotionButton = motion(Button);

const WaterTracker = () => {
  const [waterAmount, setWaterAmount] = useState(0);
  const toast = useToast();

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const { amount, date } = JSON.parse(storedData);
      if (new Date(date).toDateString() === new Date().toDateString()) {
        setWaterAmount(amount);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ amount: waterAmount, date: new Date().toISOString() }));
  }, [waterAmount]);

  const addWater = () => {
    setWaterAmount((prev) => {
      const newAmount = Math.min(prev + GLASS_SIZE, DAILY_GOAL);
      if (newAmount === DAILY_GOAL) {
        toast({ title: "Goal Achieved!", status: "success", duration: 3000 });
      }
      return newAmount;
    });
  };

  const removeWater = () => setWaterAmount((prev) => Math.max(prev - GLASS_SIZE, 0));
  const resetWater = () => setWaterAmount(0);

  const progress = (waterAmount / DAILY_GOAL) * 100;

  return (
    <Box  p={2} backgroundColor="white" borderRadius="md" boxShadow="sm" zIndex={10}>
      <VStack spacing={2}>
        <Text fontSize="sm">Water Tracker</Text>
        <WaterBottle fillPercentage={progress} />
        <Text fontSize="xs" fontWeight="bold">{waterAmount} / {DAILY_GOAL} ml</Text>
        <Progress value={progress} width="50px" colorScheme="blue" height="8px" borderRadius="full" />
        <Box display="flex" justifyContent="space-between" width="100%">
          <Tooltip label="Remove 250ml">
            <IconButton margin="5px"  icon={<Text>-</Text>} onClick={removeWater} isDisabled={waterAmount <= 0} colorScheme="red" size="sm" />
          </Tooltip>
          <Tooltip label="Add 250ml">
            <IconButton margin="5px" icon={<Text>+</Text>} onClick={addWater} isDisabled={waterAmount >= DAILY_GOAL} colorScheme="blue" size="sm" />
          </Tooltip>
          <Tooltip  label="Reset">
            <IconButton margin="5px" icon={<Text>🔄</Text>} onClick={resetWater} colorScheme="gray" size="sm" />
          </Tooltip>
        </Box>
      </VStack>
    </Box>
  );
};


const MealLog = () => {
  const { user } = useUser();
  const [date, setDate] = useState(() => {
    const dateInUTC = new Date();
    const utcTime = dateInUTC.getTime();
    const ISTOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    return new Date(utcTime + ISTOffset);
  });
  const [mealLog, setMealLog] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [calories, setCalories] = useState(0);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const mealsArray = [];

      // Fetch 10 random meals
      for (let i = 0; i < 12; i++) {
        const mealData = await fetchData(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        mealsArray.push(mealData.meals[0]); // Access the first (and only) item in the `meals` array
      }

      setMeals(mealsArray);
    };

    fetchMeals();
  }, []);

  const handleDateChange = (newDate) => {
    const utcTime = newDate.getTime();
    const ISTOffset = 5.5 * 60 * 60 * 1000;
    const newDateInIST = new Date(utcTime + ISTOffset);
    setDate(newDateInIST);
  };

  const handleLogMeal = (meal, calories) => {
    const dateString = date.toISOString().split("T")[0];
    setMealLog((prevLog) => ({
      ...prevLog,
      [dateString]: {
        ...(prevLog[dateString] || {}),
        [meal.idMeal]: { calories },
      },
    }));
    setCalories(0);
    onClose();
  };

  const formatDate = (date) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-IN", options);
  };

  const getDayStatus = (selectedDate) => {
    const today = new Date();
    const selected = new Date(selectedDate);
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    const diffTime = selected - today;

    if (diffTime === 0) {
      return "Today";
    }
    if (diffTime === 86400000) {
      return "Tomorrow";
    }
    if (diffTime === -86400000) {
      return "Yesterday";
    }
    return formatDate(selected);
  };

  const getLoggedMeal = (meal) => {
    const dateString = date.toISOString().split("T")[0];
    return mealLog[dateString]?.[meal.idMeal] || null; // Use `idMeal` here
  };

  const filteredMeals = useMemo(() => {
    return meals.filter(
      (meal) => meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase()) // Search by meal name
    );
  }, [searchTerm, meals]);

  const todaysMeals = useMemo(() => {
    const dateString = date.toISOString().split("T")[0];
    const todaysLog = mealLog[dateString] || {};
    return Object.entries(todaysLog)
      .map(([id, log]) => {
        const meal = meals.find((m) => m.idMeal === id); // Use `idMeal`
        return meal ? { ...meal, ...log } : null;
      })
      .filter(Boolean);
  }, [date, mealLog, meals]);

  const headerText = getDayStatus(date);

  return (
    <Container maxW="container.xl" py={8}>
      
      <Grid templateColumns={{ base: "1fr", md: "1fr " }} gap={6}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={6}>
          <Box position="relative" minW="600px" bg="white" p={4} borderRadius="md" boxShadow="sm">
          
            <Heading size="lg" mb={6} textAlign="center" color="primary.700">
              {headerText}
            </Heading>
            {todaysMeals.length > 0 ? (
              <TableContainer maxWidth="400px">
                <Table variant="striped" colorScheme="gray">
                  <Thead>
                    <Tr>
                      <Th>Meal</Th>
                      <Th>Calories</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {todaysMeals.map((meal, index) => (
                      <Tr key={index}>
                        <Td fontWeight="bold" color="primary.700">
                          {meal.strMeal}
                        </Td>
                        <Td>{meal.calories}</Td> {/* Display calories here */}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Text textAlign="center" color="gray.500">
                No meals logged for today.
              </Text>
            )}
            <Box position="absolute" bottom="10px" right="10px">
            <WaterTracker />
            </Box>
          </Box>


          
         
          <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
            <Calendar onChange={handleDateChange} value={date} />
          </Box>
        </Grid>
        <Box p={4}>
          <Flex mb={4} alignItems="center">
            <Input
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              mr={2}
              flex="1"
            />
            <Button leftIcon={<SearchIcon />} colorScheme="orange">
              Search
            </Button>
          </Flex>
        </Box>

        <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={4}>
          {filteredMeals.map((meal) => (
            <Box
              key={meal.idMeal}
              minW="100px"
              h="350px" // Set a fixed height for uniformity
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="sm"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Heading size="md" mb={2} noOfLines={2}>
                {meal.strMeal}
              </Heading>
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                mb={4}
                borderRadius="md"
                objectFit="cover"
                h="150px" // Set a fixed image height
                w="100%" // Make the image span the card's width
              />
              <HStack justify="space-between" mt="auto">
                <Button
                  onClick={() => {
                    setSelectedMeal(meal);
                    onOpen();
                  }}
                  colorScheme="orange"
                  variant="outline"
                >
                  Instructions
                </Button>
                <Button
                  onClick={() => {
                    setSelectedMeal(meal);
                    onOpen();
                  }}
                  colorScheme="orange"
                >
                  Log Meal
                </Button>
              </HStack>
              {getLoggedMeal(meal) && (
                <Text mt={2}>
                  Logged: {getLoggedMeal(meal).calories} calories
                </Text>
              )}
            </Box>
          ))}
        </Grid>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedMeal?.strMeal}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>{selectedMeal?.strInstructions}</Text>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogMeal(selectedMeal, calories);
              }}
            >
              <FormControl>
                <FormLabel>Calories</FormLabel>
                <NumberInput
                  value={calories}
                  min={1}
                  onChange={(value) => setCalories(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <ModalFooter>
                <Button colorScheme="blue" type="submit">
                  Log Meal
                </Button>
                <Button colorScheme="red" onClick={onClose} ml={3}>
                  Close
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default MealLog;
