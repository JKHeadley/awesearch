import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { searchToolsByKeyword, SearchResult } from '../api/search';
import SearchResultItem from '../components/SearchResultItem';

const KeywordToolsPage: React.FC = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const [tools, setTools] = useState<SearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const brandPink = '#FF69B4';
  const brandBlue = useColorModeValue('#000080', '#F0F8FF');

  useEffect(() => {
    const fetchTools = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await searchToolsByKeyword(keyword!, currentPage);
        setTools(response.docs);
        setTotalPages(response.pages.total);
      } catch (err) {
        setError('Failed to fetch tools. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, [keyword, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Box maxW="container.xl" mx="auto" px={4} py={8} bg={bgColor} minH="100vh">
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" color={brandBlue} textAlign="center">
          Tools Tagged with "{keyword}"
        </Heading>

        {isLoading && (
          <Spinner size="xl" color={brandPink} alignSelf="center" />
        )}

        {error && (
          <Text color="red.500" textAlign="center">
            {error}
          </Text>
        )}

        {!isLoading && !error && (
          <>
            <VStack spacing={6} align="stretch">
              {tools.map((tool) => (
                <SearchResultItem key={tool.id} result={tool} />
              ))}
            </VStack>

            <HStack justify="center" spacing={4}>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
                leftIcon={<ChevronLeftIcon />}
                colorScheme="pink"
              >
                Previous
              </Button>
              <Text color={textColor}>
                Page {currentPage} of {totalPages}
              </Text>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={currentPage === totalPages}
                rightIcon={<ChevronRightIcon />}
                colorScheme="pink"
              >
                Next
              </Button>
            </HStack>
          </>
        )}

        <Button as={RouterLink} to="/" colorScheme="blue" alignSelf="center">
          Back to Search
        </Button>
      </VStack>
    </Box>
  );
};

export default KeywordToolsPage;
