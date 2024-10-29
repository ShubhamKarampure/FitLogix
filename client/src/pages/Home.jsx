import React from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import Navbar from '../components/Home/Navbar';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import Testimonials from '../components/Home/Testimonials';
import Footer from '../components/Home/Footer';
import TrackYourProgress from '../components/Home/ProgressTrack';
import Login from '../components/Auth/Login';
import Register from '../components/auth/Register';

const LandingPage = () => {
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure(); 
  return (
    <Box>
      <Navbar onLoginOpen={onLoginOpen} onRegisterOpen={onRegisterOpen} /> 
      <Box flex="1" bg="rgba(255, 255, 255, 0.9)" borderRadius="md" p={5} boxShadow="md">
        <Hero />
        <Features />
        <TrackYourProgress />
        <Testimonials />
        
        {/* Modals */}
        <Login isOpen={isLoginOpen} onClose={onLoginClose} onRegister={onRegisterOpen}/>
        <Register isOpen={isRegisterOpen} onClose={onRegisterClose} onLogin={onLoginOpen}/> 
      </Box>
      <Footer />
    </Box>
  );
};

export default LandingPage;
