import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Flex,
  Input,
  Button,
  VStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  useToast,
  Spinner,
  Text,
  Center,
} from '@chakra-ui/react';
import { IoSend,IoTrash } from "react-icons/io5";
import axios from 'axios';
import { API_ROUTES } from '../services/apiRoutes';
import { IoBarbell } from 'react-icons/io5';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useUser } from "../context/userContext";

const Message = ({ message, user }) => (
  <>
    {/* User's Question (on the right) */}
    <Flex mb={4} direction="column" align="flex-end">
      <Flex justify="flex-end">
        <img
          src={user.profile.avatar}
          alt="User Avatar"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <Box
          width="auto"  // Allow dynamic width
          maxW="60%"  // Ensures it won't grow too wide
          bg="gray.100"
          p={3}
          borderRadius="lg"
          textAlign="left"
          mb={2}
          ml={3}  // Adds space between the icon and message
          wordBreak="break-word"  // Ensures the text wraps when too long
          flexShrink={1}  // Allows it to shrink
        >
          <Text>{message.question}</Text>
        </Box>
      </Flex>
    </Flex>

    {/* AI's Answer (on the left) */}
    <Flex mb={4} direction="column" align="flex-start">
      <Flex justify="flex-start">
        <IoBarbell size={35} color="blue" />
        <Box
          width="auto"  // Allow dynamic width
          maxW="60%"  // Ensures it won't grow too wide
          minW="250px"  // Ensures the box doesn't shrink too much
          bg="blue.100"
          p={3}
          borderRadius="lg"
          textAlign="left"
          ml={3}  // Adds space between the icon and message
          wordBreak="break-word"  // Ensures the text wraps when too long
          flexShrink={1}  // Allows it to shrink
        >
          {/* Render the AI's answer as Markdown */}
          <Markdown remarkPlugins={[remarkGfm]}>{message.answer}</Markdown>
        </Box>
      </Flex>
    </Flex>
  </>
);

const NoChat = () => (
  <Flex justify="center" align="center" h="full" direction="column" textAlign="center">
    <Text fontSize="xl" color="gray.500" mb={4}>No messages yet.</Text>
    <Text fontSize="lg" color="gray.600">Start a conversation and let's get chatting with GymGenie!</Text>
  </Flex>
);


const Chat = () => {
 const { user } = useUser();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const sendMessageHandler = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const apiUrl = `${API_ROUTES.GEMINI}=${import.meta.env.VITE_API_KEY}`;
      const response = await axios.post(apiUrl, {
        "contents": [{
          "parts": [{
            "text": `${import.meta.env.VITE_PROMPT} ${input}`
          }]
        }]
      });
      console.log(import.meta.env.VITE_PROMPT)
      if (response.data.candidates) {
      const message = {
        question: input,
        answer: response.data.candidates[0].content.parts[0].text
      };

      // Directly update the messages state with the new question-answer pair
      setMessages(prevMessages => [
        ...prevMessages,
        { question: message.question, answer: message.answer }
      ]);
      setInput("");  // Clear the input after sending the message
    }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

    const handleClearChat = async () => {
    try {
      
        setMessages([]);
        toast({
          title: "Chat Cleared",
          description: "All messages have been cleared.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to clear chat. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

    useEffect(() => {
      const apiKey = import.meta.env.VITE_API_KEY;

    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  

  return (
    
      <Card w="full" h="80vh" boxShadow="xl" borderRadius="lg" mt={2}>
  <CardHeader>
    <Flex justify="space-between" align="center">
      <Heading size="lg">GymGenie</Heading>
      <Button
        leftIcon={<IoTrash />}
        colorScheme="red"
        variant="ghost"
        onClick={handleClearChat}
        size="sm"
      >
        Clear Chat
      </Button>
    </Flex>
  </CardHeader>

  <CardBody overflowY="auto" height="100%">
    <VStack spacing={4} align="stretch" height="full">
      {messages.length === 0 ? (
        <Flex
          width="100%"
          height="full" // Ensure Flex takes up the full height of the parent
          justify="center"
          align="center" // Center content both vertically and horizontally
        >
          <NoChat />
        </Flex>
      ) : (
        messages.map((message, index) => (
          <Message key={index} message={message} user={user} />
        ))
      )}
      <div ref={messageEndRef} />
    </VStack>
  </CardBody>

  <CardFooter>
    <form onSubmit={sendMessageHandler} style={{ width: '100%' }}>
      <Flex>
        <Input
          flex={1}
          mr={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          disabled={loading}
        />
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={loading}
          loadingText="Sending"
          leftIcon={loading ? <Spinner size="sm" /> : <IoSend />}
        >
          Send
        </Button>
      </Flex>
    </form>
  </CardFooter>
</Card>

    
  );
};

export default Chat;