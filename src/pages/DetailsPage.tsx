import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Grid,
  GridItem,
  Link,
  Tag,
  Card,
  CardBody,
  useColorModeValue,
  useBreakpointValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tooltip,
  IconButton,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ExternalLinkIcon,
  CopyIcon,
  InfoIcon,
} from '@chakra-ui/icons';
import LoadingOverlay from '../components/LoadingOverlay';
import { getToolDetails } from '../api/search';
import { useStore } from '../store/store';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedTool, setSelectedTool, isLoading, setIsLoading } = useStore();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const cardBgColor = useColorModeValue('white', 'gray.600');
  const accordionBgColor = useColorModeValue('blue.50', 'blue.900');
  const accordionColor = useColorModeValue('blue.600', 'blue.200');

  const logoSrc = useColorModeValue(
    '/src/assets/logo-light.png',
    '/src/assets/logo-dark.png',
  );
  const isMobile = useBreakpointValue({ base: true, md: false });

  const analysisFromState = location.state?.analysis;

  useEffect(() => {
    const fetchToolDetails = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const details = await getToolDetails(id);
          setSelectedTool(details);
        } catch (error) {
          console.error('Error fetching tool details:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchToolDetails();
  }, [id, setSelectedTool, setIsLoading]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!selectedTool) return null;

  return (
    <Box
      maxW="container.xl"
      mx="auto"
      mt={8}
      pb={16}
      px={4}
      bg={bgColor}
      minH="100vh"
    >
      <LoadingOverlay isLoading={isLoading} />
      <Button
        as={RouterLink}
        to="/"
        mb={6}
        mt={4} // Added top margin
        leftIcon={<ChevronLeftIcon />}
        size={isMobile ? 'md' : 'lg'}
        colorScheme="blue"
        variant="outline"
        width={isMobile ? 'full' : 'auto'}
      >
        Back to Search Results
      </Button>
      <VStack align="stretch" spacing={8}>
        <Card>
          <CardBody>
            <Flex
              direction={isMobile ? 'column' : 'row'}
              align="start"
              justify="space-between"
              wrap="wrap"
            >
              <Flex
                direction="column"
                align={isMobile ? 'center' : 'start'}
                mb={isMobile ? 4 : 0}
                minW={isMobile ? 'auto' : '200px'}
              >
                <Image
                  src={selectedTool.logo || logoSrc}
                  alt={selectedTool.name}
                  boxSize={isMobile ? '80px' : '150px'}
                  objectFit="contain"
                  mb={4}
                />
                <HStack spacing={2} mt={2}>
                  <Badge
                    colorScheme={selectedTool.open_source ? 'green' : 'red'}
                    fontSize="md"
                    px={2}
                    py={1}
                  >
                    {selectedTool.open_source ? 'Open Source' : 'Closed Source'}
                  </Badge>
                  <Badge
                    colorScheme={selectedTool.free ? 'green' : 'red'}
                    fontSize="md"
                    px={2}
                    py={1}
                  >
                    {selectedTool.free ? 'Free' : 'Paid'}
                  </Badge>
                </HStack>
              </Flex>
              <VStack align="start" flex={1} ml={isMobile ? 0 : 8} spacing={4}>
                <Heading as="h1" size={isMobile ? 'xl' : '2xl'}>
                  {selectedTool.name}
                </Heading>
                <HStack>
                  <Link
                    href={selectedTool.url}
                    isExternal
                    color="blue.500"
                    fontSize={isMobile ? 'md' : 'lg'}
                  >
                    {selectedTool.url} <ExternalLinkIcon mx="2px" />
                  </Link>
                  <Tooltip label={copied ? 'Copied!' : 'Copy URL'}>
                    <IconButton
                      aria-label="Copy URL"
                      icon={<CopyIcon />}
                      size="sm"
                      onClick={() => copyToClipboard(selectedTool.url)}
                    />
                  </Tooltip>
                </HStack>
              </VStack>
            </Flex>
          </CardBody>
        </Card>

        <Accordion allowMultiple defaultIndex={[0]}>
          <AccordionItem>
            <h2>
              <AccordionButton
                bg={accordionBgColor}
                _hover={{ bg: accordionBgColor }}
              >
                <Box flex="1" textAlign="left">
                  <Heading
                    as="h2"
                    size={isMobile ? 'lg' : 'xl'}
                    color={accordionColor}
                  >
                    AI Analysis
                  </Heading>
                </Box>
                <AccordionIcon color={accordionColor} />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text fontSize={isMobile ? 'md' : 'lg'} lineHeight="tall">
                {analysisFromState || selectedTool.analysis}
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                bg={accordionBgColor}
                _hover={{ bg: accordionBgColor }}
              >
                <Box flex="1" textAlign="left">
                  <Heading
                    as="h2"
                    size={isMobile ? 'lg' : 'xl'}
                    color={accordionColor}
                  >
                    Summary and Description
                  </Heading>
                </Box>
                <AccordionIcon color={accordionColor} />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Heading as="h3" size="md" mb={2}>
                    Summary
                  </Heading>
                  <Text fontSize={isMobile ? 'sm' : 'md'} lineHeight="tall">
                    {selectedTool.summary}
                  </Text>
                </Box>
                <Box>
                  <Heading as="h3" size="md" mb={2}>
                    Description
                  </Heading>
                  <Text fontSize={isMobile ? 'sm' : 'md'} lineHeight="tall">
                    {selectedTool.description}
                  </Text>
                </Box>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                bg={accordionBgColor}
                _hover={{ bg: accordionBgColor }}
              >
                <Box flex="1" textAlign="left">
                  <Heading
                    as="h2"
                    size={isMobile ? 'lg' : 'xl'}
                    color={accordionColor}
                  >
                    Purpose and Use
                  </Heading>
                </Box>
                <AccordionIcon color={accordionColor} />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Grid
                templateColumns={isMobile ? '1fr' : 'repeat(2, 1fr)'}
                gap={4}
              >
                <GridItem>
                  <Heading as="h3" size="md" mb={2}>
                    Purpose
                  </Heading>
                  <Text fontSize={isMobile ? 'sm' : 'md'} lineHeight="tall">
                    {selectedTool.purpose}
                  </Text>
                </GridItem>
                <GridItem>
                  <Heading as="h3" size="md" mb={2}>
                    Intended Use
                  </Heading>
                  <Text fontSize={isMobile ? 'sm' : 'md'} lineHeight="tall">
                    {selectedTool.intended_use}
                  </Text>
                </GridItem>
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Card>
          <CardBody>
            <Heading as="h3" size={isMobile ? 'md' : 'lg'} mb={4}>
              Categories
            </Heading>
            <Grid
              templateColumns={isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'}
              gap={4}
            >
              {['category', 'sub_category', 'group', 'class'].map((field) => (
                <VStack key={field} align="start">
                  <Text fontWeight="bold" fontSize={isMobile ? 'xs' : 'sm'}>
                    {field.charAt(0).toUpperCase() +
                      field.slice(1).replace('_', '-')}
                    :
                  </Text>
                  <Text fontSize={isMobile ? 'sm' : 'md'}>
                    {selectedTool[field]}
                  </Text>
                </VStack>
              ))}
            </Grid>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading as="h3" size={isMobile ? 'md' : 'lg'} mb={4}>
              Keywords
            </Heading>
            <Box>
              {selectedTool.keywords.map((keyword, index) => (
                <Tag
                  key={index}
                  size={isMobile ? 'sm' : 'md'}
                  colorScheme="blue"
                  borderRadius="full"
                  cursor="pointer"
                  m={1}
                  _hover={{ bg: 'blue.600', color: 'white' }}
                >
                  {keyword}
                </Tag>
              ))}
            </Box>
          </CardBody>
        </Card>

        <HStack justify="center" mt={8}>
          <Button
            as={Link}
            href={selectedTool.url}
            isExternal
            colorScheme="blue"
            rightIcon={<ExternalLinkIcon />}
          >
            Visit Website
          </Button>
          <Button
            leftIcon={<InfoIcon />}
            onClick={() => {
              /* Implement share functionality */
            }}
          >
            Share
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default DetailsPage;
