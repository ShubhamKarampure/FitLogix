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
} from "@chakra-ui/react";
import { useUser } from "../context/userContext";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SearchIcon } from "@chakra-ui/icons";
import { fetchData, exerciseOptions } from "../services/utils/fetchData";


const WorkoutLog = () => {

const exercises = JSON.parse(import.meta.env.VITE_EXERCISES);
const bodyParts = [
    'back', 
    'cardio', 
    'chest', 
    'lower arms', 
    'lower legs', 
    'neck', 
    'shoulders', 
    'upper arms', 
    'upper legs', 
    'waist'
  ];
  
    const { user } = useUser();
  const [date, setDate] = useState(() => {
    const dateInUTC = new Date();
    const utcTime = dateInUTC.getTime();
    const ISTOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    return new Date(utcTime + ISTOffset);
  });
  const [workoutLog, setWorkoutLog] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedExercise, setSelectedExercise] = useState(null);
  
  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(1);
{/* 
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  useEffect(() => {
    const fetchExercises = async () => {
      const exerciseData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?offset=0&limit=10",
        ["back"]
      );
      setExercises(exerciseData);
    };
    console.log(exercises)
    
    const fetchBodyParts = async () => {
      const url = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";
      try {
        const bodyParts = await fetchData(url, exerciseOptions);
        setBodyParts(bodyParts);
      } catch (error) {
        console.error("Error fetching body parts:", error);
      }
      console.log(bodyParts)
    };
    
    fetchBodyParts();
    fetchExercises();
    
    
  }, []);
  */}

  const handleDateChange = (newDate) => {
    const utcTime = newDate.getTime(); // Get the timestamp of the new date
    const ISTOffset = 5.5 * 60 * 60 * 1000; // IST offset: 5.5 hours in milliseconds
    const newDateInIST = new Date(utcTime + ISTOffset); // Adjust to IST
    setDate(newDateInIST); // Update state with the new date in IST
  };

  const handleLogWorkout = (exercise, sets, reps) => {
    const dateString = date.toISOString().split("T")[0];
    setWorkoutLog((prevLog) => ({
      ...prevLog,
      [dateString]: {
        ...(prevLog[dateString] || {}),
        [exercise.id]: { sets, reps },
      },
    }));
    setReps(1);
    setSets(1);
    onClose();
  };

  const formatDate = (date) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-IN", options); // Use "en-IN" locale for a more natural date format
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

  const getLoggedWorkout = (exercise) => {
    const dateString = date.toISOString().split("T")[0];
    return workoutLog[dateString]?.[exercise.id] || null;
  };

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      return (
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedBodyPart || exercise.bodyPart === selectedBodyPart)
      );
    });
  }, [searchTerm, selectedBodyPart, exercises]);

    const todaysWorkouts = useMemo(() => {
      
    const dateString = date.toISOString().split("T")[0];
      const todaysLog = workoutLog[dateString] || {};
      
    return Object.entries(todaysLog)
      .map(([id, log]) => {
          const exercise = exercises.find((e) => e.id === id);
        return exercise ? { ...exercise, ...log } : null;
      })
      .filter(Boolean);
  }, [date, workoutLog, exercises]);

  const headerText = getDayStatus(date);

  return (
    <Container maxW="container.xl" py={8}>
      
      <Grid templateColumns={{ base: "1fr", md: "1fr " }} gap={6}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
          <Box minW="600px" bg="white" p={4} borderRadius="md" boxShadow="sm">
            <Heading size="lg" mb={6} textAlign="center" color="primary.700">
        {headerText}
      </Heading>
      
      {todaysWorkouts.length > 0 ? (
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Exercise</Th>
                <Th>Sets</Th>
                <Th>Reps</Th>
              </Tr>
            </Thead>
            <Tbody>
              {todaysWorkouts.map((workout, index) => (
                <Tr key={index}>
                  <Td fontWeight="bold" color="primary.700">{workout.name}</Td>
                  <Td>{workout.sets}</Td>
                  <Td>{workout.reps}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text textAlign="center" color="gray.500">
          No workouts logged for today.
        </Text>
      )}
          </Box>
          <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
            <Calendar onChange={handleDateChange} value={date} />
          </Box>
        </Grid>
        <Box mx="auto" p={4}>
          <Flex mb={4} alignItems="center">
            <Input
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              mr={2}
              flex="1"
            />
            <Button leftIcon={<SearchIcon />} colorScheme="orange">
              Search
            </Button>
          </Flex>
          <Wrap spacing={2} mb={4}>
            {bodyParts.map((bodyPart) => (
              <WrapItem key={bodyPart}>
                <Button
                  onClick={() =>
                    setSelectedBodyPart(
                      selectedBodyPart === bodyPart ? null : bodyPart
                    )
                  }
                  colorScheme={selectedBodyPart === bodyPart ? "orange" : "gray"}
                  variant={selectedBodyPart === bodyPart ? "solid" : "outline"}
                >
                  {bodyPart}
                </Button>
              </WrapItem>
            ))}
          </Wrap>
        </Box>

        <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={4}>
          {filteredExercises.map((exercise) => (
            <Box
              key={exercise.id}
              minW="100px"
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="sm"
            >
              <Heading size="md" mb={2}>
                {exercise.name}
              </Heading>
              <Badge colorScheme="orange" mb={2}>
                {exercise.bodyPart}
              </Badge>
              <Image
                src={exercise.gifUrl}
                alt={exercise.name}
                mb={4}
                borderRadius="md"
              />
              <HStack justify="space-between">
                <Button
                  onClick={() => {
                    setSelectedExercise(exercise);
                    onOpen();
                  }}
                  colorScheme="orange"
                  variant="outline"
                >
                  Instructions
                </Button>
                <Button
                  onClick={() => {
                    setSelectedExercise(exercise);
                    onOpen();
                  }}
                  colorScheme="orange"
                >
                  Log Workout
                </Button>
              </HStack>
              {getLoggedWorkout(exercise) && (
                <Text mt={2}>
                  Logged: {getLoggedWorkout(exercise).sets} sets,{" "}
                  {getLoggedWorkout(exercise).reps} reps
                </Text>
              )}
            </Box>
          ))}
        </Grid>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedExercise?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>{selectedExercise?.instructions}</Text>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogWorkout(selectedExercise, sets, reps);
              }}
            >
              <FormControl>
                <FormLabel>Sets</FormLabel>
                <NumberInput
                  value={sets}
                  min={1}
                  onChange={(value) => setSets(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Reps</FormLabel>
                <NumberInput
                  value={reps}
                  min={1}
                  onChange={(value) => setReps(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <ModalFooter>
                <Button type="submit" colorScheme="orange">
                  Log Workout
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default WorkoutLog;
