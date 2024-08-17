import React, { useState, useEffect } from 'react';
import {
  Box,
  Textarea,
  Button,
  VStack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import SearchResults from '../components/SearchResults';
import LoadingOverlay from '../components/LoadingOverlay';
import { searchDatabase } from '../api/search';
import { useStore } from '../store/store';

const exampleQueries = [
  'I need a React component library with good accessibility features and extensive documentation.',
  'Looking for a Python data visualization tool that works well with large datasets and supports interactive plots.',
  'Recommend a lightweight CSS framework for rapid prototyping of responsive web designs.',
  'Find me a Node.js ORM with support for multiple databases and an active community.',
  "Suggest a JavaScript testing framework that's easy to set up and has good async support.",
];

const SearchPage: React.FC = () => {
  const {
    query,
    setQuery,
    searchResults,
    setSearchResults,
    isLoading,
    setIsLoading,
  } = useStore();
  const [placeholder, setPlaceholder] = useState('');
  const [isPlaceholder, setIsPlaceholder] = useState(true);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const brandPink = '#FF69B4';

  useEffect(() => {
    const randomQuery =
      exampleQueries[Math.floor(Math.random() * exampleQueries.length)];
    setPlaceholder(randomQuery);
    setQuery(randomQuery);
  }, [setQuery]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await searchDatabase(isPlaceholder ? placeholder : query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error during search:', error);
      // Optionally, show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = () => {
    if (isPlaceholder) {
      setQuery('');
      setIsPlaceholder(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    setIsPlaceholder(false);
  };

  return (
    <Box
      maxW="container.xl"
      mx="auto"
      pb={16}
      mt={8}
      px={isMobile ? 4 : 0}
      bg={bgColor}
      minH="calc(100vh - 100px)"
    >
      <LoadingOverlay isLoading={isLoading} />
      <VStack spacing={6} width="100%">
        <Text fontSize="lg" fontWeight="bold" color={brandPink}>
          Try an example query or enter your own:
        </Text>
        <Textarea
          value={isPlaceholder ? placeholder : query}
          onChange={handleChange}
          onFocus={handleFocus}
          size={isMobile ? 'md' : 'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          borderColor={brandPink}
          _hover={{ borderColor: 'pink.400' }}
          _focus={{
            borderColor: 'pink.400',
            boxShadow: `0 0 0 1px ${brandPink}`,
          }}
          height="150px"
          resize="vertical"
        />
        <Button
          onClick={handleSearch}
          isLoading={isLoading}
          width={isMobile ? '100%' : 'auto'}
          size={isMobile ? 'md' : 'lg'}
          colorScheme="pink"
        >
          Search
        </Button>
        <Text fontSize="sm" color="gray.500">
          Click Search to try the example query, or modify it for your specific
          needs.
        </Text>
        <SearchResults results={searchResults} />
      </VStack>
    </Box>
  );
};

export default SearchPage;
