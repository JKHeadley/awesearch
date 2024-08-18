import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { SearchIcon } from '@chakra-ui/icons';

const NotFoundPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const brandPink = '#FF69B4';
  const brandBlue = useColorModeValue('#000080', '#F0F8FF');

  return (
    <Box
      maxW="container.xl"
      mx="auto"
      px={4}
      py={16}
      minH="calc(100vh - 100px)"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={8} textAlign="center">
        <Heading as="h1" size="4xl" color={brandPink}>
          404
        </Heading>
        <Heading as="h2" size="xl" color={brandBlue}>
          Oops! Page Not Found
        </Heading>
        <Text fontSize="xl" color={textColor}>
          Looks like our awesome search couldn't find this page.
        </Text>
        <Text fontSize="lg" color={textColor}>
          Don't worry, even the best developers hit a 404 sometimes!
        </Text>
        <Button
          as={RouterLink}
          to="/"
          colorScheme="pink"
          size="lg"
          leftIcon={<SearchIcon />}
        >
          Back to Awesome Searching
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFoundPage;
