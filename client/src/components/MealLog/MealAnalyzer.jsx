import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Text,
  VStack,
  Input, // Import Input here
  Heading,
  GridItem,
} from '@chakra-ui/react';

export default function MealAnalyzer({
  imageFile,
  setImageFile,
  isAnalyzing,
  setIsAnalyzing,
  setAnalyzedMeal,
}) {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const analyzeImage = () => {
    if (!imageFile) {
      // Handle no image case
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalyzedMeal({
        name: 'Grilled Chicken Salad',
        calories: 350,
        protein: 30,
        carbs: 15,
        fat: 20,
      });
      setIsAnalyzing(false);
      // Show success toast
    }, 2000);
  };

  return (
    <GridItem>
      <Box borderWidth={1} borderRadius="lg" p={6}>
        <VStack spacing={4} align="stretch">
          <Heading as="h2" size="lg">AI Meal Analysis</Heading>
          <Text>Upload an image of your meal for AI analysis!</Text>
          <FormControl>
            <FormLabel htmlFor="meal-image">Upload Meal Image</FormLabel>
            <Input
              type="file"
              id="meal-image"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </FormControl>
          {imageFile && (
            <Image
              src={URL.createObjectURL(imageFile)}
              alt="Uploaded meal"
              maxH="200px"
              objectFit="cover"
              borderRadius="md"
            />
          )}
          <Button
            colorScheme="orange"
            onClick={analyzeImage}
            isLoading={isAnalyzing}
            loadingText="Analyzing..."
          >
            Analyze Image
          </Button>
          {/* Add analyzed meal results here */}
        </VStack>
      </Box>
    </GridItem>
  );
}
