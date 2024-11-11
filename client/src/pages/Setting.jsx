
import React from 'react'
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Switch,
  Textarea,
  VStack,
  extendTheme,
} from '@chakra-ui/react'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          bg: 'orange.500',
        },
      },
      variants: {
        solid: {
          bg: 'orange.400',
          color: 'white',
        },
        outline: {
          borderColor: 'orange.400',
          color: 'orange.400',
        },
      },
    },
    Switch: {
      baseStyle: {
        track: {
          _checked: {
            bg: 'orange.400',
          },
        },
      },
    },
    Accordion: {
      baseStyle: {
        button: {
          _hover: {
            bg: 'orange.50',
          },
        },
      },
    },
  },
})

export default function SettingsPage() {
  const handleSubmit = (event) => {
    event.preventDefault()
    // Here you would typically send the form data to your backend
    alert('Settings saved!')
  }

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="6xl" py={8}>
       
        <form onSubmit={handleSubmit}>
          <Accordion allowMultiple>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Personal Information
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <VStack spacing={4} align="stretch">
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input placeholder="First Name" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input placeholder="Last Name" />
                      </FormControl>
                    </Grid>
                    <FormControl>
                      <FormLabel>Profile Picture</FormLabel>
                      <Input type="file" accept="image/*" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Gender</FormLabel>
                      <Select placeholder="Select gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="other">Other</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Date of Birth</FormLabel>
                      <Input type="date" />
                    </FormControl>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <FormControl>
                        <FormLabel>Height (cm)</FormLabel>
                        <Input type="number" placeholder="Height in cm" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Weight (kg)</FormLabel>
                        <Input type="number" placeholder="Weight in kg" />
                      </FormControl>
                    </Grid>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Fitness Goals
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>Goal Type</FormLabel>
                      <Select placeholder="Select goal type">
                        <option value="weight-loss">Weight Loss</option>
                        <option value="muscle-gain">Muscle Gain</option>
                        <option value="endurance">Endurance</option>
                        <option value="flexibility">Flexibility</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Target Weight (kg)</FormLabel>
                      <Input type="number" placeholder="Target weight in kg" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Daily Step Goal</FormLabel>
                      <Input type="number" placeholder="Daily step goal" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Daily Calorie Goal</FormLabel>
                      <Input type="number" placeholder="Daily calorie goal" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Exercise Frequency (days per week)</FormLabel>
                      <Input type="number" min={1} max={7} placeholder="Days per week" />
                    </FormControl>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Workout Preferences
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>Preferred Workout Types</FormLabel>
                      <Textarea placeholder="e.g., cardio, strength training, yoga, HIIT" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Preferred Equipment</FormLabel>
                      <Textarea placeholder="e.g., dumbbells, kettlebells, machines" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Typical Workout Duration (minutes)</FormLabel>
                      <Input type="number" placeholder="Duration in minutes" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Rest Time Between Sets (seconds)</FormLabel>
                      <Input type="number" placeholder="Rest time in seconds" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Preferred Workout Intensity</FormLabel>
                      <Select placeholder="Select intensity">
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                      </Select>
                    </FormControl>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Notifications & Alerts
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <VStack spacing={4} align="stretch">
                    <Flex justify="space-between">
                      <FormLabel htmlFor="dailyReminders">Daily Workout Reminders</FormLabel>
                      <Switch id="dailyReminders" />
                    </Flex>
                    <Flex justify="space-between">
                      <FormLabel htmlFor="progressAlerts">Progress Alerts</FormLabel>
                      <Switch id="progressAlerts" />
                    </Flex>
                    <Flex justify="space-between">
                      <FormLabel htmlFor="workoutReminder">Workout Reminder</FormLabel>
                      <Switch id="workoutReminder" />
                    </Flex>
                    <Flex justify="space-between">
                      <FormLabel htmlFor="mealReminders">Meal Tracking Reminders</FormLabel>
                      <Switch id="mealReminders" />
                    </Flex>
                    <Flex justify="space-between">
                      <FormLabel htmlFor="motivationalQuotes">Motivational Quotes</FormLabel>
                      <Switch id="motivationalQuotes" />
                    </Flex>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Privacy & Data Management
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>Data Visibility</FormLabel>
                      <Select placeholder="Select visibility">
                        <option value="private">Private</option>
                        <option value="friends">Friends</option>
                        <option value="public">Public</option>
                      </Select>
                    </FormControl>
                    <Flex justify="space-between">
                      <FormLabel htmlFor="shareWithCoaches">Share Data with Coaches/Trainers</FormLabel>
                      <Switch id="shareWithCoaches" />
                    </Flex>
                    <Flex justify="space-between">
                      <FormLabel htmlFor="thirdPartyIntegration">Integration with Third-Party Apps</FormLabel>
                      <Switch id="thirdPartyIntegration" />
                    </Flex>
                    <Button variant="outline">Export Data</Button>
                    <Button colorScheme="red">Delete Account</Button>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Health Metrics
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <VStack spacing={4} align="stretch">
                    <Flex justify="space-between">
                      <FormLabel htmlFor="trackBloodPressure">Track Blood Pressure</FormLabel>
                      <Switch id="trackBloodPressure" />
                    </Flex>
                    <Flex justify="space-between">
                      <FormLabel htmlFor="trackSleep">Track Sleep Patterns</FormLabel>
                      <Switch id="trackSleep" />
                    </Flex>
                    <Flex justify="space-between">
                      <FormLabel htmlFor="trackHeartRate">Track Heart Rate</FormLabel>
                      <Switch id="trackHeartRate" />
                    </Flex>
                    <Flex justify="space-between">
                      <FormLabel htmlFor="trackSteps">Track Steps</FormLabel>
                      <Switch id="trackSteps" />
                    </Flex>
                    <Flex justify="space-between">
                      <FormLabel htmlFor="trackCalories">Track Calories Burned</FormLabel>
                      <Switch id="trackCalories" />
                    </Flex>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Grid>
          </Accordion>

          <Button mt={6} type="submit" colorScheme="orange">
            Save Settings
          </Button>
        </form>
      </Container>
    </ChakraProvider>
  )
}