import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';

export default function MealLogger({ mealType, setMealType }) {
  return (
    <GridItem>
      <Box borderWidth={1} borderRadius="lg" p={6}>
        <VStack spacing={4} align="stretch">
          <Heading as="h2" size="lg">Log Your Meal</Heading>
          <FormControl>
            <FormLabel htmlFor="meal-type">Type of Meal</FormLabel>
            <Select
              id="meal-type"
              placeholder="Select meal type"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="meal-details">Meal Details</FormLabel>
            <Textarea id="meal-details" placeholder="Describe your meal" />
          </FormControl>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <FormControl>
              <FormLabel htmlFor="calories">Calories</FormLabel>
              <Input type="number" id="calories" placeholder="Enter calories" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="protein">Protein (g)</FormLabel>
              <Input type="number" id="protein" placeholder="Enter protein" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="carbs">Carbs (g)</FormLabel>
              <Input type="number" id="carbs" placeholder="Enter carbs" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="fat">Fat (g)</FormLabel>
              <Input type="number" id="fat" placeholder="Enter fat" />
            </FormControl>
          </Grid>
          <Button colorScheme="orange" w="full">Save Meal</Button>
        </VStack>
      </Box>
    </GridItem>
  );
}
