import React, { useState, useEffect } from 'react';
import {
  Box,
  Textarea,
  Button,
  VStack,
  Text,
  HStack,
  useBreakpointValue,
  useColorModeValue,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import SearchResults from '../components/SearchResults';
import LoadingOverlay from '../components/LoadingOverlay';
import { searchDatabase } from '../api/search';
import { useStore } from '../store/store';
import { exampleQueries } from './ExampleQueries';

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
  const brandBlue = useColorModeValue('#000080', '#F0F8FF');

  const getRandomQuery = () => {
    return exampleQueries[Math.floor(Math.random() * exampleQueries.length)];
  };

  useEffect(() => {
    const randomQuery = getRandomQuery();
    setPlaceholder(randomQuery);
    setQuery(randomQuery);
    setIsPlaceholder(true);
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

  const handleTryAnother = () => {
    const newQuery = getRandomQuery();
    setPlaceholder(newQuery);
    setQuery(newQuery);
    setIsPlaceholder(true);
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
        <Text fontSize="lg" fontWeight="bold" color={brandBlue}>
          Try an example query or enter your own:
        </Text>
        <HStack width="100%" align="start">
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
          <Tooltip label="Try another example query">
            <IconButton
              aria-label="Try another query"
              icon={<RepeatIcon />}
              onClick={handleTryAnother}
              colorScheme="pink"
              size={isMobile ? 'md' : 'lg'}
            />
          </Tooltip>
        </HStack>
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
          needs. Use the refresh button to try another example.
        </Text>
        <SearchResults results={searchResults} />
      </VStack>
    </Box>
  );
};

export default SearchPage;
