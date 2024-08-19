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
  const { setSelectedTool, setIsLoading } = useStore();
  
  const logoSrc = useColorModeValue(
    import.meta.env.VITE_LOGO_DARK_URL,
    import.meta.env.VITE_LOGO_LIGHT_URL,
  );
  const isMobile = useBreakpointValue({ base: true, md: false });
  const cardBg = useColorModeValue('white', 'gray.700');
  const brandBlue = useColorModeValue('#000080', '#F0F8FF');
  const brandPink = '#FF69B4';

  return (
    <Box borderWidth={1} borderRadius="lg" p={6} bg={cardBg} boxShadow="md">
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
          ml={isMobile ? 0 : 6}
          spacing={3}
          width="100%"
        >
          <Heading
            as="h2"
            size={isMobile ? 'md' : 'lg'}
            textAlign={isMobile ? 'center' : 'left'}
            color={brandBlue}
          >
            {result.name}
          </Heading>
          <Text
            fontSize={isMobile ? 'sm' : 'md'}
            textAlign={isMobile ? 'center' : 'left'}
            color={brandPink}
            fontWeight="bold"
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
            colorScheme="pink"
            mt={2}
            // onclick set tool to null and loading to true
            onCanPlay={() => {
              setSelectedTool(null);
              setIsLoading(true);
            }}
          >
            View Details
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default SearchResultItem;
