import React, { useState } from 'react';
import { Box, Input, Button, VStack } from '@chakra-ui/react';
import SearchResults from '../components/SearchResults';
import { searchDatabase } from '../api/search';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const searchResults = await searchDatabase(query);
    setResults(searchResults);
  };

  return (
    <Box maxW="container.xl" mx="auto" mt={8}>
      <VStack spacing={4}>
        <Input
          placeholder="Describe the tool you're looking for..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
        <SearchResults results={results} />
      </VStack>
    </Box>
  );
};

export default SearchPage;