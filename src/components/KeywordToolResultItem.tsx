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

interface KeywordToolResultItemProps {
  tool: any;
}

const KeywordToolResultItem: React.FC<KeywordToolResultItemProps> = ({
  tool,
}) => {
  const logoSrc = useColorModeValue(
    '/src/assets/logo-light.png',
    '/src/assets/logo-dark.png',
  );
  const isMobile = useBreakpointValue({ base: true, md: false });
  const cardBg = useColorModeValue('white', 'gray.700');
  const brandBlue = useColorModeValue('#000080', '#F0F8FF');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box borderWidth={1} borderRadius="lg" p={6} bg={cardBg} boxShadow="md">
      <Flex
        direction={isMobile ? 'column' : 'row'}
        alignItems={isMobile ? 'center' : 'flex-start'}
      >
        <Image
          src={tool.logo || logoSrc}
          alt={tool.name}
          boxSize={isMobile ? '80px' : '100px'}
          objectFit="contain"
          mb={isMobile ? 4 : 0}
          mr={isMobile ? 0 : 6}
        />
        <VStack
          align={isMobile ? 'center' : 'flex-start'}
          spacing={3}
          width="100%"
        >
          <Heading
            as="h2"
            size={isMobile ? 'md' : 'lg'}
            textAlign={isMobile ? 'center' : 'left'}
            color={brandBlue}
          >
            {tool.name}
          </Heading>
          <Text
            fontSize={isMobile ? 'sm' : 'md'}
            textAlign={isMobile ? 'center' : 'left'}
            color={textColor}
          >
            {tool.summary}
          </Text>
          <Button
            as={RouterLink}
            to={`/details/${tool._id}`}
            width={isMobile ? '100%' : 'auto'}
            size={isMobile ? 'sm' : 'md'}
            colorScheme="pink"
            mt={2}
          >
            View Details
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default KeywordToolResultItem;
