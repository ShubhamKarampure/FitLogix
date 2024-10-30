import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  Text,
  useToast,
  Image,
  Grid,
  GridItem,
  List,
  ListItem,
  Divider,
  Checkbox,
  Stack,
  Badge,
} from '@chakra-ui/react'

export default function MealLog() {
  const [mealType, setMealType] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzedMeal, setAnalyzedMeal] = useState(null)
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false)
  const [generatedRecipe, setGeneratedRecipe] = useState(null)
  const toast = useToast()

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImageFile(file)
    }
  }

  const analyzeImage = () => {
    if (!imageFile) {
      toast({
        title: 'No image selected',
        description: 'Please upload an image to analyze',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsAnalyzing(true)
    // Simulating AI analysis with a timeout
    setTimeout(() => {
      setAnalyzedMeal({
        name: 'Grilled Chicken Salad',
        calories: 350,
        protein: 30,
        carbs: 15,
        fat: 20,
      })
      setIsAnalyzing(false)
      toast({
        title: 'Analysis Complete',
        description: 'Your meal has been analyzed and added to the log',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }, 2000)
  }

  const generateRecipe = () => {
    setIsGeneratingRecipe(true)
    // Simulating AI recipe generation with a timeout
    setTimeout(() => {
      setGeneratedRecipe({
        name: 'Quinoa Veggie Bowl',
        cookingTime: '25 minutes',
        ingredients: [
          '1 cup quinoa',
          '2 cups water',
          '1 cup mixed vegetables (bell peppers, zucchini, carrots)',
          '1/4 cup olive oil',
          '1 lemon, juiced',
          'Salt and pepper to taste',
        ],
        instructions: [
          'Rinse quinoa and cook in water according to package instructions.',
          'While quinoa is cooking, chop the vegetables.',
          'Heat olive oil in a pan and sauté the vegetables until tender-crisp.',
          'Fluff the cooked quinoa with a fork and mix in the sautéed vegetables.',
          'Drizzle with lemon juice, and season with salt and pepper.',
          'Serve warm or at room temperature.',
        ],
        nutritionalInfo: {
          calories: 300,
          protein: 10,
          carbs: 40,
          fat: 15,
        },
      })
      setIsGeneratingRecipe(false)
      toast({
        title: 'Recipe Generated',
        description: 'Your personalized recipe is ready!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }, 3000)
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Meal Log & Recipe Generator
        </Heading>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8}>
          <GridItem>
            <Box borderWidth={1} borderRadius="lg" p={6}>
              <VStack spacing={4} align="stretch">
                <Heading as="h2" size="lg">
                  Log Your Meal
                </Heading>
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
                <Button colorScheme="orange" w="full">
                  Save Meal
                </Button>
              </VStack>
            </Box>
          </GridItem>

          <GridItem>
            <Box borderWidth={1} borderRadius="lg" p={6}>
              <VStack spacing={4} align="stretch">
                <Heading as="h2" size="lg">
                  AI Meal Analysis
                </Heading>
                <Text>Don't want to input all the details? Upload an image of your meal for AI analysis!</Text>
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
                {analyzedMeal && (
                  <Box borderWidth={1} borderRadius="md" p={4}>
                    <Heading as="h3" size="md" mb={2}>
                      Analysis Results
                    </Heading>
                    <List spacing={2}>
                      <ListItem>
                        <Text fontWeight="bold">Meal: {analyzedMeal.name}</Text>
                      </ListItem>
                      <ListItem>Calories: {analyzedMeal.calories}</ListItem>
                      <ListItem>Protein: {analyzedMeal.protein}g</ListItem>
                      <ListItem>Carbs: {analyzedMeal.carbs}g</ListItem>
                      <ListItem>Fat: {analyzedMeal.fat}g</ListItem>
                    </List>
                  </Box>
                )}
              </VStack>
            </Box>
          </GridItem>
        </Grid>

        <Box borderWidth={1} borderRadius="lg" p={6}>
          <Heading as="h2" size="lg" mb={4}>
            AI Recipe Maker
          </Heading>
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
            <FormControl>
              <FormLabel>Meal Type</FormLabel>
              <Stack direction={['column', 'row']} spacing={4}>
                {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((type) => (
                  <Checkbox key={type}>{type}</Checkbox>
                ))}
              </Stack>
            </FormControl>
            <FormControl>
              <FormLabel>Nutritional Goals</FormLabel>
              <Stack direction={['column', 'row']} spacing={4}>
                <Checkbox>Low Calorie</Checkbox>
                <Checkbox>High Protein</Checkbox>
              </Stack>
            </FormControl>
            <Button
              colorScheme="orange"
              onClick={generateRecipe}
              isLoading={isGeneratingRecipe}
              loadingText="Generating Recipe..."
            >
              Generate Recipe
            </Button>
          </VStack>

          {generatedRecipe && (
            <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
              <Heading as="h3" size="md" mb={2}>
                {generatedRecipe.name}
              </Heading>
              <Text mb={2}>Cooking Time: {generatedRecipe.cookingTime}</Text>
              <Heading as="h4" size="sm" mb={2}>
                Ingredients:
              </Heading>
              <List spacing={1} mb={4}>
                {generatedRecipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>{ingredient}</ListItem>
                ))}
              </List>
              <Heading as="h4" size="sm" mb={2}>
                Instructions:
              </Heading>
              <List spacing={1} mb={4}>
                {generatedRecipe.instructions.map((step, index) => (
                  <ListItem key={index}>
                    {index + 1}. {step}
                  </ListItem>
                ))}
              </List>
              <Heading as="h4" size="sm" mb={2}>
                Nutritional Information:
              </Heading>
              <Flex wrap="wrap" gap={2}>
                <Badge colorScheme="green">Calories: {generatedRecipe.nutritionalInfo.calories}</Badge>
                <Badge colorScheme="blue">Protein: {generatedRecipe.nutritionalInfo.protein}g</Badge>
                <Badge colorScheme="orange">Carbs: {generatedRecipe.nutritionalInfo.carbs}g</Badge>
                <Badge colorScheme="red">Fat: {generatedRecipe.nutritionalInfo.fat}g</Badge>
              </Flex>
              <Button mt={4} colorScheme="orange" size="sm">
                Save to Meal Log
              </Button>
            </Box>
          )}
        </Box>

        <Box borderWidth={1} borderRadius="lg" p={6}>
          <Heading as="h2" size="lg" mb={4}>
            Logged Meals History
          </Heading>
          <VStack spacing={4} align="stretch">
            {['Breakfast', 'Lunch', 'Dinner'].map((meal, index) => (
              <React.Fragment key={meal}>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="bold">{meal}</Text>
                    <Text fontSize="sm" color="gray.600">
                      Oatmeal with berries
                    </Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.600">
                      Calories: 300
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Protein: 10g | Carbs: 45g | Fat: 8g
                    </Text>
                  </Box>
                  <Flex>
                    <Button size="sm" variant="ghost" mr={2}>
                      Edit
                    </Button>
                    <Button size="sm" variant="ghost" colorScheme="red">
                      Delete
                    </Button>
                  </Flex>
                </Flex>
                {index < 2 && <Divider />}
              </React.Fragment>
            ))}
          </VStack>
          <Box mt={6}>
            <Heading as="h3" size="md" mb={2}>
              Daily Summary
            </Heading>
            <Text>Total Calories: 1500 | Protein: 75g | Carbs: 180g | Fat: 50g</Text>
          </Box>
        </Box>
      </VStack>
    </Container>
  )
}