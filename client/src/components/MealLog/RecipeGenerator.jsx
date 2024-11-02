import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  VStack,
} from '@chakra-ui/react';

export default function RecipeGenerator({ isGeneratingRecipe, setIsGeneratingRecipe, setGeneratedRecipe }) {
  const generateRecipe = () => {
    setIsGeneratingRecipe(true);
    setTimeout(() => {
      setGeneratedRecipe({
        name: 'Quinoa Veggie Bowl',
        cookingTime: '25 minutes',
        ingredients: ['1 cup quinoa', '2 cups water', '1 cup mixed vegetables', '...'],
        instructions: ['Rinse quinoa...', 'Serve warm or at room temperature.'],
        nutritionalInfo: { calories: 300, protein: 10, carbs: 40, fat: 15 },
      });
      setIsGeneratingRecipe(false);
      // Show success toast
    }, 3000);
  };

  return (
    <Box borderWidth={1} borderRadius="lg" p={6}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Diet Type</FormLabel>
          <Select placeholder="Select diet type">
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-Free</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Cuisine Preference</FormLabel>
          <Select placeholder="Select cuisine">
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="asian">Asian</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Available Ingredients</FormLabel>
          <Input placeholder="Enter ingredients (comma-separated)" />
        </FormControl>
        <Button
          colorScheme="orange"
          onClick={generateRecipe}
          isLoading={isGeneratingRecipe}
          loadingText="Generating Recipe..."
        >
          Generate Recipe
        </Button>
        {/* Display generated recipe here */}
      </VStack>
    </Box>
  );
}
