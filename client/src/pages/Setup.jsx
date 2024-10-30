import { useState, useEffect } from 'react';
import { Button, Input, FormControl, FormLabel, Radio, RadioGroup, Stack, Avatar, Text, Box, Progress, useToast } from '@chakra-ui/react';
import { ArrowRight, UserCircle2 } from 'lucide-react';
import profileService from '../services/profileService';
import { useNavigate } from "react-router-dom";

export default function Setup() {
    const navigate = useNavigate(); 
    const toast = useToast();
    const [step, setStep] = useState(0);
    const [profile, setProfile] = useState({
        user: '', 
        name: '',
        age: '',
        weight: '',
        height: '',
        gender: '',
        avatar: null,
    });

    useEffect(() => {
        const userId = localStorage.getItem('user_id'); // Adjust key as needed
        if (userId) {
            setProfile((prevProfile) => ({ ...prevProfile, user: userId }));
        }
    }, []); // Run only once on component mount

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

    if (step === 1) { // Weight step
            const age = parseFloat(profile.age);
            if (age<18) { // Assuming human weight range
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
            if (weight < 30 || weight > 300) { // Assuming human weight range
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
            if (height < 50 || height > 250) { // Assuming human height range
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
        try {
            const response = await profileService.createProfile(profile);
            console.log('Profile created successfully:', response);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating profile:', error);
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-lg">
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

                <form onSubmit={handleSubmit} className="space-y-6">
                    {steps[step].component}
                    <div className="flex justify-between">
                        {step > 0 && (
                            <Button variant="outline" onClick={() => setStep(step - 1)} colorScheme="orange">
                                Back
                            </Button>
                        )}
                        {step < steps.length - 1 ? (
                            <Button
                                onClick={handleNext}
                                isDisabled={!profile[steps[step].label.toLowerCase()]} // Ensure the current step input is valid
                                colorScheme="orange"
                            >
                                Next <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                colorScheme="orange" 
                                isDisabled={!isFormComplete()} // Disable if the form is not complete
                            >
                                Complete Profile
                            </Button>
                        )}
                    </div>
                    <Progress value={(step + 1) * (100 / steps.length)} size="lg" colorScheme="orange" borderRadius="md" mt={4} />
                </form>
            </div>
        </div>
    );
}
