import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Stack,
  Text,
  VStack,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormLabel,
} from '@chakra-ui/react'
import { ChevronDownIcon, AddIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons'

// Mock data for food items
const foodItems = [
  { id: 1, name: 'Grilled Chicken', calories: 165, protein: 31, carbs: 0, fat: 3.6, image: '/placeholder.svg?height=100&width=100' },
  { id: 2, name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.6, image: '/placeholder.svg?height=100&width=100' },
  { id: 3, name: 'Broccoli', calories: 55, protein: 4, carbs: 11, fat: 0.6, image: '/placeholder.svg?height=100&width=100' },
  { id: 4, name: 'Salmon', calories: 206, protein: 22, carbs: 0, fat: 13, image: '/placeholder.svg?height=100&width=100' },
  { id: 5, name: 'Sweet Potato', calories: 180, protein: 2, carbs: 41, fat: 0.1, image: '/placeholder.svg?height=100&width=100' },
]

export default function MealLog() {
  const [selectedMeal, setSelectedMeal] = useState('Lunch')
  const [mealTypes, setMealTypes] = useState(['Breakfast', 'Lunch', 'Dinner', 'Snack'])
  const [searchTerm, setSearchTerm] = useState('')
  const [addedFoods, setAddedFoods] = useState([])
  const [newMealType, setNewMealType] = useState('')
  const [newFood, setNewFood] = useState({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 })
  const [filters, setFilters] = useState({
    calories: [0, 500],
    protein: [0, 50],
    carbs: [0, 100],
    fat: [0, 50],
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const filteredFoods = foodItems.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    food.calories >= filters.calories[0] && food.calories <= filters.calories[1] &&
    food.protein >= filters.protein[0] && food.protein <= filters.protein[1] &&
    food.carbs >= filters.carbs[0] && food.carbs <= filters.carbs[1] &&
    food.fat >= filters.fat[0] && food.fat <= filters.fat[1]
  )

  const addFood = (food) => {
    setAddedFoods([...addedFoods, food])
  }

  const removeFood = (foodId) => {
    setAddedFoods(addedFoods.filter(food => food.id !== foodId))
  }

  const addNewMealType = () => {
    if (newMealType && !mealTypes.includes(newMealType)) {
      setMealTypes([...mealTypes, newMealType])
      setSelectedMeal(newMealType)
      setNewMealType('')
    }
  }

  const handleAddCustomFood = () => {
    setAddedFoods([...addedFoods, { ...newFood, id: addedFoods.length + 1 }])
    setNewFood({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 })
    onClose()
  }

  const totalNutrition = addedFoods.reduce((acc, food) => ({
    calories: acc.calories + food.calories,
    protein: acc.protein + food.protein,
    carbs: acc.carbs + food.carbs,
    fat: acc.fat + food.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  return (
    <Box color="black" minH="100vh">
      <Container maxW="container.xl" py={8}>
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="orange.300" color="black" _hover={{ bg: "orange.400" }}>
              Add Meal
            </MenuButton>
            <MenuList bg="white">
              {mealTypes.map((meal) => (
                <MenuItem key={meal} onClick={() => setSelectedMeal(meal)} _hover={{ bg: "orange.300" }}>
                  {meal}
                </MenuItem>
              ))}
              <MenuItem closeOnSelect={false} _hover={{ bg: "orange.300" }}>
                <Input 
                  placeholder="New meal type" 
                  value={newMealType} 
                  onChange={(e) => setNewMealType(e.target.value)}
                  mr={2}
                />
                <Button onClick={addNewMealType} size="sm" bg="orange.300" _hover={{ bg: "orange.400" }}>Add</Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Flex overflowX="auto" mb={6}>
          {mealTypes.map((meal) => (
            <Button
              key={meal}
              onClick={() => setSelectedMeal(meal)}
              mr={2}
              bg={selectedMeal === meal ? "orange.300" : "gray.200"}
              color="black"
              _hover={{ bg: "orange.400" }}
            >
              {meal}
            </Button>
          ))}
        </Flex>

        <Flex flexDirection={{ base: "column", md: "row" }} gap={6}>
          <Box flex={2}>
            <Flex mb={4}>
              <Input
                placeholder="Search foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                flex={1}
                mr={2}
                bg="white"
                color="black"
                _placeholder={{ color: "gray.400" }}
              />
              <Popover>
                <PopoverTrigger>
                  <Button bg="orange.300" color="black" _hover={{ bg: "orange.400" }}>
                    <SearchIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent bg="white" borderColor="orange.300">
                  <PopoverBody>
                    <VStack spacing={4}>
                      {Object.entries(filters).map(([key, value]) => (
                        <Box key={key} w="100%">
                          <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                          <Slider
                            aria-label={`${key}-range`}
                            defaultValue={value}
                            min={0}
                            max={key === 'calories' ? 1000 : 100}
                            step={1}
                            onChange={(val) => setFilters({...filters, [key]: [0, val]})}
                          >
                            <SliderTrack bg="orange.100">
                              <SliderFilledTrack bg="orange.500" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} />
                          </Slider>
                          <Flex justify="space-between">
                            <Text fontSize="sm">{value[0]}</Text>
                            <Text fontSize="sm">{value[1]}</Text>
                          </Flex>
                        </Box>
                      ))}
                    </VStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>

            <HStack mb={4}>
              <Button onClick={onOpen} bg="orange.300" color="black" _hover={{ bg: "orange.400" }}>Add Your Own Meal</Button>
              <Button variant="outline" color="orange.500" borderColor="orange.500" _hover={{ bg: "orange.300", color: "black" }}>Generate Recipe</Button>
            </HStack>

            <VStack spacing={4}>
              {filteredFoods.map((food) => (
                <Card key={food.id} direction="row" overflow="hidden" variant="outline" w="100%" bg="white" shadow="md">
                  <Image objectFit="cover" maxW="100px" src={food.image} alt={food.name} />
                  <Stack>
                    <CardBody>
                      <Heading size="md">{food.name}</Heading>
                      <Text>Calories: {food.calories}</Text>
                      <Text>Protein: {food.protein}g, Carbs: {food.carbs}g, Fat: {food.fat}g</Text>
                      <Button mt={2} onClick={() => addFood(food)} bg="orange.300" color="black" _hover={{ bg: "orange.400" }}>Add</Button>
                    </CardBody>
                  </Stack>
                </Card>
              ))}
            </VStack>
          </Box>

          <Box flex={1} bg="white" p={6} borderRadius="md" shadow="md">
            <Heading size="md" mb={4}>Added Foods</Heading>
            {addedFoods.length > 0 ? (
              <VStack spacing={4}>
                {addedFoods.map((food) => (
                  <Flex key={food.id} w="100%" justify="space-between" align="center">
                    <Text>{food.name}</Text>
                    <Button onClick={() => removeFood(food.id)} color="orange.500">
                      <CloseIcon />
                    </Button>
                  </Flex>
                ))}
              </VStack>
            ) : (
              <Text>No foods added.</Text>
            )}

            <Heading size="md" mt={6} mb={2}>Nutrition Summary</Heading>
            <Text>Calories: {totalNutrition.calories}</Text>
            <Text>Protein: {totalNutrition.protein}g</Text>
            <Text>Carbs: {totalNutrition.carbs}g</Text>
            <Text>Fat: {totalNutrition.fat}g</Text>
          </Box>
        </Flex>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Custom Food</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder="Food name" value={newFood.name} onChange={(e) => setNewFood({ ...newFood, name: e.target.value })} />
              <Input placeholder="Calories" type="number" value={newFood.calories} onChange={(e) => setNewFood({ ...newFood, calories: Number(e.target.value) })} />
              <Input placeholder="Protein (g)" type="number" value={newFood.protein} onChange={(e) => setNewFood({ ...newFood, protein: Number(e.target.value) })} />
              <Input placeholder="Carbs (g)" type="number" value={newFood.carbs} onChange={(e) => setNewFood({ ...newFood, carbs: Number(e.target.value) })} />
              <Input placeholder="Fat (g)" type="number" value={newFood.fat} onChange={(e) => setNewFood({ ...newFood, fat: Number(e.target.value) })} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleAddCustomFood} bg="orange.300" color="black" _hover={{ bg: "orange.400" }}>Add Food</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
