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
    Flex,
    Spacer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from '@chakra-ui/react';
import { ArrowRight, UserCircle2 } from 'lucide-react';
import { useUser } from '../../context/userContext';

export default function ProfileUpdate({onClose}) {
    const { refreshUser } = useUser();
    const toast = useToast();
    const [profile, setProfile] = useState({
        name: '',
        age: '',
        weight: '',
        height: '',
        gender: '',
        avatar: null,
    });
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []); // Empty dependency array means this runs once on mount

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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

        if (!isFormComplete()) {
            console.error('Profile is incomplete. Cannot submit.');
            return;
        }

        setLoading(true); // Start loading
        try {
            const response = await profileService.updateProfile(profile); // Adjust this to your service method for updating the profile
            console.log('Profile updated successfully:', response);
            await refreshUser();
            onClose(); // Close modal after submission
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const isFormComplete = () => {
        return profile.name && profile.age && profile.weight && profile.height && profile.gender;
    };

    return (
        <>
            <Button onClick={onOpen} colorScheme="orange">Update Profile</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Your Profile</ModalHeader>
                    <ModalBody>
                        <Box textAlign="center" mb={4}>
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
                            <FormControl isRequired>
                                <FormLabel>What's your gender?</FormLabel>
                                <RadioGroup onChange={(value) => setProfile({ ...profile, gender: value })} value={profile.gender}>
                                    <Stack spacing={5} direction="column">
                                        <Radio value="male">Male</Radio>
                                        <Radio value="female">Female</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
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
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        <Spacer />
                        <Button
                            colorScheme="orange"
                            onClick={handleSubmit}
                            isLoading={loading} // Disable button during loading
                        >
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
