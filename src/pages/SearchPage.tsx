import React from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import SearchResults from '../components/SearchResults';
import LoadingOverlay from '../components/LoadingOverlay';
import { searchDatabase } from '../api/search';
import { useStore } from '../store/store';

const SearchPage: React.FC = () => {
  const {
    query,
    setQuery,
    searchResults,
    setSearchResults,
    isLoading,
    setIsLoading,
  } = useStore();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const brandPink = '#FF69B4';

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await searchDatabase(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error during search:', error);
      // Optionally, show an error message to the user
    } finally {
      setIsLoading(false);
    }
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
        <Input
          placeholder="Describe the tool you're looking for..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size={isMobile ? 'md' : 'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          borderColor={brandPink}
          _hover={{ borderColor: 'pink.400' }}
          _focus={{
            borderColor: 'pink.400',
            boxShadow: `0 0 0 1px ${brandPink}`,
          }}
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
        <SearchResults results={searchResults} />
      </VStack>
    </Box>
  );
};

export default SearchPage;
