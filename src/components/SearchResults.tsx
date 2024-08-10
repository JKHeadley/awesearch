import React from 'react';
import { VStack } from '@chakra-ui/react';
import SearchResultItem from './SearchResultItem';

interface SearchResultsProps {
  results: any[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <VStack spacing={4} align="stretch">
      {results.map((result) => (
        <SearchResultItem key={result.url} result={result} />
      ))}
    </VStack>
  );
};

export default SearchResults;