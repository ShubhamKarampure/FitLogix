import { useState, useEffect } from 'react';
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    Avatar,
    Text,
    Box,
    useToast,
    Spinner,
    Flex,
    Spacer
} from '@chakra-ui/react';
import { ArrowRight, UserCircle2 } from 'lucide-react';
import profileService from '../services/profileService';
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/userContext';

  export default function Setup() {
    const { refreshUser } = useUser();
    const navigate = useNavigate(); 
    const toast = useToast();
    const [step, setStep] = useState(0);
    const [profile, setProfile] = useState({
        name: '',
        age: '',
        weight: '',
        height: '',
        gender: '',
        avatar: null,
    });
    const [loading, setLoading] = useState(false); // Loading state

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Convert name to sentence case
        if (name === 'name') {
            const sentenceCaseName = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            setProfile({ ...profile, [name]: sentenceCaseName });
        } else {
            setProfile({ ...profile, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfile({ ...profile, avatar: e.target.files[0] });
        }
    };

    const handleNext = () => {
        if (step === 1) { // Age step
            const age = parseFloat(profile.age);
            if (age < 18) {
                toast({
                    title: "Invalid Age",
                    description: "We only serve adults",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
                return;
            }
        }

        if (step === 2) { // Weight step
            const weight = parseFloat(profile.weight);
            if (weight < 30 || weight > 300) { 
                toast({
                    title: "Invalid Weight",
                    description: "Please enter a valid weight between 30kg and 300kg.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
                return;
            }
        }

        if (step === 3) { // Height step
            const height = parseFloat(profile.height);
            if (height < 50 || height > 250) { 
                toast({
                    title: "Invalid Height",
                    description: "Please enter a valid height between 50cm and 250cm.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
                return;
            }
        }

        setStep(step + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (parseInt(profile.age) < 18) {
            toast({
                title: "Age Restriction",
                description: "We currently only allow adults to register.",
                status: "warning",
                duration: 4000,
                isClosable: true,
            });
            return;
        }
        
        console.log('Submitting Profile:', profile);
        if (!isFormComplete()) {
            console.error('Profile is incomplete. Cannot submit.');
            return;
        }

        setLoading(true); // Start loading
        try {
            const response = await profileService.createProfile(profile);
            console.log('Profile created successfully:', response);
            await refreshUser();
            navigate('/home/dashboard');
        } catch (error) {
            console.error('Error creating profile:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const steps = [
        {
            label: 'Name',
            component: (
                <FormControl isRequired>
                    <FormLabel htmlFor="name">What's your name?</FormLabel>
                    <Input
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        bg="white"
                        borderColor="orange.400"
                    />
                </FormControl>
            ),
        },
        {
            label: 'Age',
            component: (
                <FormControl isRequired>
                    <FormLabel htmlFor="age">How old are you?</FormLabel>
                    <Input
                        id="age"
                        name="age"
                        type="number"
                        value={profile.age}
                        onChange={handleInputChange}
                        placeholder="Enter your age"
                        bg="white"
                        borderColor="orange.400"
                    />
                </FormControl>
            ),
        },
        {
            label: 'Weight',
            component: (
                <FormControl isRequired>
                    <FormLabel htmlFor="weight">What's your weight (in kg)?</FormLabel>
                    <Input
                        id="weight"
                        name="weight"
                        type="number"
                        value={profile.weight}
                        onChange={handleInputChange}
                        placeholder="Enter your weight"
                        bg="white"
                        borderColor="orange.400"
                    />
                </FormControl>
            ),
        },
        {
            label: 'Height',
            component: (
                <FormControl isRequired>
                    <FormLabel htmlFor="height">What's your height (in cm)?</FormLabel>
                    <Input
                        id="height"
                        name="height"
                        type="number"
                        value={profile.height}
                        onChange={handleInputChange}
                        placeholder="Enter your height"
                        bg="white"
                        borderColor="orange.400"
                    />
                </FormControl>
            ),
        },
        {
            label: 'Gender',
            component: (
                <FormControl isRequired>
                    <FormLabel>What's your gender?</FormLabel>
                    <RadioGroup onChange={(value) => setProfile({ ...profile, gender: value })} value={profile.gender}>
                        <Stack spacing={5} direction="column">
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
            ),
        },
        {
            label: 'Avatar',
            component: (
                <FormControl>
                    <FormLabel>Upload your avatar</FormLabel>
                    <Stack direction="row" spacing={4} alignItems="center">
                        {profile.avatar ? (
                            <Avatar size="lg" src={URL.createObjectURL(profile.avatar)} />
                        ) : (
                            <Avatar size="lg" icon={<UserCircle2 className="w-10 h-10 text-gray-400" />} />
                        )}
                        <Input
                            id="avatar"
                            name="avatar"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            variant="outline"
                            bg="white"
                            borderColor="gray.300"
                            padding={1}
                        />
                    </Stack>
                </FormControl>
            ),
        },
    ];

    const isFormComplete = () => {
        return profile.name && profile.age && profile.weight && profile.height && profile.gender && profile.avatar;
    };

    // Keydown event listener for "Enter" key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent the default form submission
                handleNext(); // Call handleNext function
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [step, profile]); // Dependency array includes step and profile to avoid stale closures

    return (
        <Flex
            align="center"
            justify="center"
            minH="100vh"
            bg="gray.50"
        >
            <Box
                w="full"
                maxW="md"
                p={8}
                bg="white"
                borderRadius="xl"
                boxShadow="lg"
            >
                <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    Set Up Your Profile
                </Text>
                <Box textAlign="center" mt={4} mb={4}>
                    <iframe
                        src="https://lottie.host/embed/134d61c0-1dbe-4b3e-bbb8-1f67b2e74ee6/6870vsdcQW.json"
                        style={{
                            width: '200px',
                            height: '200px',
                            margin: '0 auto',
                            border: 'none',
                        }}
                        title="Lottie Animation"
                    ></iframe>
                </Box>

                <Box maxW="lg" mx="auto" p={4}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {steps[step].component}
                        <Flex mt={4} align="center"> {/* Flex container for buttons */}
                            {step > 0 && (
                                <Button variant="outline" onClick={() => setStep(step - 1)} colorScheme="orange">
                                    Back
                                </Button>
                            )}
                            <Spacer />
                            <Button
                                type={step === steps.length - 1 ? "submit" : "button"}
                                onClick={step === steps.length - 1 ? handleSubmit : handleNext}
                                colorScheme="orange"
                                rightIcon={<ArrowRight />}
                                isLoading={loading && step === steps.length - 1} // Disable button during loading
                            >
                                {step === steps.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                        </Flex>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
}
