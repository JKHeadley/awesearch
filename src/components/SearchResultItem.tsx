import React from 'react';
import { Box, Image, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface SearchResultItemProps {
  result: any;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result }) => {
  return (
    <Box borderWidth={1} borderRadius="lg" p={4}>
      <Flex>
        <Image src={result.logo || '/devdiveai_logo.png'} alt={result.name} boxSize="100px" objectFit="contain" />
        <Box ml={4}>
          <Heading as="h2" size="md">
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              {result.name}
            </a>
          </Heading>
          <Text>Score: {result.score}</Text>
          <Text mt={2}>{result.analysis}</Text>
          <Button as={RouterLink} to={`/details/${result.id}`} mt={2}>
            View Details
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default SearchResultItem;