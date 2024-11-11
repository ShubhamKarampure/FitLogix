import React, { useState, useEffect } from 'react';
import { Box, Heading, Grid, Image, Text, IconButton, Spinner, Container, Link } from '@chakra-ui/react';
import { FaSyncAlt } from 'react-icons/fa'; // Importing refresh icon
import axios from 'axios';

const API_KEY = '3d3fa0dbfd4b4fbab62f850b4e845b5e'; // Replace with your NewsAPI key
const API_URL = 'https://newsapi.org/v2/everything?q=workout%20forum&apiKey=';

const HealthTips = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch articles function
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}${API_KEY}`);
      console.log(response);


      const filteredArticles = response.data.articles
        .filter(article => article.source && article.source.name && article.urlToImage)
      const shuffledArticles = filteredArticles.sort(() => 0.5 - Math.random());
      const randomArticles = shuffledArticles.slice(0, 3);

      setArticles(randomArticles);

    } catch (error) {
      setError('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  // Fetch articles when component mounts or when user refreshes
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mt={6}>
      <Container maxW="container.xl" mt={5}>
        <Heading mb={5} textAlign="center">Health Tips</Heading>
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            icon={<FaSyncAlt />}
            isLoading={loading}
            onClick={fetchArticles}
            aria-label="Refresh Articles"
            colorScheme="blue"
          />
        </Box>

        {loading && <Spinner />}
        {error && <Text color="red.500">{error}</Text>}

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }} gap={4} mt={4}>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                _hover={{ boxShadow: 'lg', cursor: 'pointer' }}
              >
                <Image src={article.urlToImage} alt={article.title} objectFit="cover" width="100%" height="200px" />
                <Box p={4}>
                  <Heading size="md" mb={2}>
                    <Link href={article.url} isExternal>{article.title}</Link>
                  </Heading>
                  <Text noOfLines={4}>{article.description}</Text>
                </Box>
              </Box>
            ))
          ) : (
            <Text color="gray.500">No articles available.</Text>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default HealthTips;
