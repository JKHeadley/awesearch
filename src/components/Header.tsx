import React from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';

const Header: React.FC = () => {
  return (
    <Box as="header" bg="gray.100" py={4}>
      <Flex maxW="container.xl" mx="auto" alignItems="center">
        <Heading as="h1" size="xl">
          DevDiveAI -
        </Heading>
        <Heading as="h3" size="md" ml={4} fontWeight="normal">
          dive deep, surface smarter.
        </Heading>
      </Flex>
    </Box>
  );
};

export default Header;