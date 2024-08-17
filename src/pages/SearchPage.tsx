import React from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  useBreakpointValue,
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
    <Box maxW="container.xl" mx="auto" pb={16} mt={8} px={isMobile ? 4 : 0}>
      <LoadingOverlay isLoading={isLoading} />
      <VStack spacing={4} width="100%">
        <Input
          placeholder="Describe the tool you're looking for..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size={isMobile ? 'md' : 'lg'}
        />
        <Button
          onClick={handleSearch}
          isLoading={isLoading}
          width={isMobile ? '100%' : 'auto'}
          size={isMobile ? 'md' : 'lg'}
        >
          Search
        </Button>
        <SearchResults results={searchResults} />
      </VStack>
    </Box>
  );
};

export default SearchPage;
