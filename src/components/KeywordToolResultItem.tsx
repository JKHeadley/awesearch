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
  Link,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useStore } from '../store/store';
import ReactGA from 'react-ga4';

interface KeywordToolResultItemProps {
  tool: any;
}

const KeywordToolResultItem: React.FC<KeywordToolResultItemProps> = ({
  tool,
}) => {
  const { setSelectedTool, setIsLoading } = useStore();

  const logoSrc = useColorModeValue(
    import.meta.env.VITE_LOGO_DARK_URL,
    import.meta.env.VITE_LOGO_LIGHT_URL,
  );
  const isMobile = useBreakpointValue({ base: true, md: false });
  const cardBg = useColorModeValue('white', 'gray.700');
  const brandBlue = useColorModeValue('#000080', '#F0F8FF');
  const brandPink = '#FF69B4';
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const handleExternalLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    ReactGA.event({
      category: 'Tool',
      action: 'External Link Click',
      label: tool.url,
    });
  };

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
          <Flex alignItems="center">
            <Heading
              as={RouterLink}
              to={`/details/${tool._id}`}
              state={{ analysis: tool.analysis }}
              size={isMobile ? 'md' : 'lg'}
              textAlign={isMobile ? 'center' : 'left'}
              color={brandBlue}
              _hover={{ textDecoration: 'underline' }}
              onClick={() => {
                ReactGA.event({
                  category: 'Tool',
                  action: 'View Details',
                  label: tool.url,
                });
                setSelectedTool(null);
                setIsLoading(true);
              }}
            >
              {tool.name}
            </Heading>
            <Tooltip label="Visit tool website">
              <Link
                href={tool.url}
                isExternal
                ml={2}
                onClick={handleExternalLinkClick}
              >
                <Icon as={ExternalLinkIcon} color={brandPink} />
              </Link>
            </Tooltip>
          </Flex>
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
            onClick={() => {
              ReactGA.event({
                category: 'Tool',
                action: 'View Details from Keyword Search',
                label: tool.url,
              });
            }}
          >
            View Details
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default KeywordToolResultItem;
