import React from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useStore } from '../store/store';

interface SearchResultItemProps {
  result: any;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result }) => {
  const logoSrc = useColorModeValue(
    '/src/assets/logo-light.png',
    '/src/assets/logo-dark.png',
  );
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box borderWidth={1} borderRadius="lg" p={4}>
      <Flex
        direction={isMobile ? 'column' : 'row'}
        alignItems={isMobile ? 'center' : 'flex-start'}
      >
        <Image
          src={result.logo || logoSrc}
          alt={result.name}
          boxSize={isMobile ? '80px' : '100px'}
          objectFit="contain"
          mb={isMobile ? 4 : 0}
        />
        <VStack
          align={isMobile ? 'center' : 'flex-start'}
          ml={isMobile ? 0 : 4}
          spacing={2}
          width="100%"
        >
          <Heading
            as="h2"
            size={isMobile ? 'md' : 'lg'}
            textAlign={isMobile ? 'center' : 'left'}
          >
            {result.name}
          </Heading>
          <Text
            fontSize={isMobile ? 'sm' : 'md'}
            textAlign={isMobile ? 'center' : 'left'}
          >
            Score: {result.score}
          </Text>
          <Text
            fontSize={isMobile ? 'sm' : 'md'}
            textAlign={isMobile ? 'center' : 'left'}
          >
            {result.analysis}
          </Text>
          <Button
            as={RouterLink}
            to={`/details/${result._id}`}
            state={{ analysis: result.analysis }}
            width={isMobile ? '100%' : 'auto'}
            size={isMobile ? 'sm' : 'md'}
          >
            View Details
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default SearchResultItem;
