import React, { useEffect } from 'react';
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
  Divider,
  Link,
  Tag,
  Card,
  CardBody,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import LoadingOverlay from '../components/LoadingOverlay';
import { getToolDetails } from '../api/search';
import { useStore } from '../store/store';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedTool, setSelectedTool, isLoading, setIsLoading } = useStore();
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const cardBgColor = useColorModeValue('white', 'gray.600');
  const location = useLocation();

  const logoSrc = useColorModeValue(
    '/src/assets/logo-light.png',
    '/src/assets/logo-dark.png',
  );

  const isMobile = useBreakpointValue({ base: true, md: false });

  // Retrieve the analysis from the location state
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
          // Optionally, show an error message to the user
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchToolDetails();
  }, [id, setSelectedTool, setIsLoading]);

  if (!selectedTool) return null;

  return (
    <Box
      maxW="container.xl"
      mx="auto"
      mt={4}
      pt={2}
      pb={16}
      px={2}
      bg={bgColor}
      minH="100vh"
    >
      <LoadingOverlay isLoading={isLoading} />
      <Button
        as={RouterLink}
        to="/"
        mb={4}
        leftIcon={<ChevronLeftIcon />}
        size={isMobile ? 'md' : 'lg'}
        colorScheme="blue"
        variant="outline"
        width={isMobile ? 'full' : 'auto'}
      >
        Back to Search Results
      </Button>
      <VStack align="stretch" spacing={4}>
        <Card>
          <CardBody>
            <VStack spacing={4} align="start">
              <Image
                src={selectedTool.logo || logoSrc}
                alt={selectedTool.name}
                boxSize={isMobile ? '100px' : '150px'}
                objectFit="contain"
              />
              <Box>
                <Heading as="h1" size={isMobile ? 'xl' : '2xl'} mb={2}>
                  {selectedTool.name}
                </Heading>
                <Link
                  href={selectedTool.url}
                  isExternal
                  color="blue.500"
                  fontSize={isMobile ? 'md' : 'xl'}
                >
                  {selectedTool.url} <ExternalLinkIcon mx="2px" />
                </Link>
                <VStack mt={4} align="start">
                  <Badge
                    colorScheme={selectedTool.open_source ? 'green' : 'red'}
                    fontSize="sm"
                    px={2}
                    py={1}
                  >
                    {selectedTool.open_source ? 'Open Source' : 'Closed Source'}
                  </Badge>
                  <Badge
                    colorScheme={selectedTool.free ? 'green' : 'red'}
                    fontSize="sm"
                    px={2}
                    py={1}
                  >
                    {selectedTool.free ? 'Free' : 'Paid'}
                  </Badge>
                </VStack>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading as="h2" size={isMobile ? 'lg' : 'xl'} mb={2}>
              AI Analysis
            </Heading>
            <Text fontSize={isMobile ? 'md' : 'lg'} lineHeight="tall">
              {analysisFromState || selectedTool.analysis}
            </Text>
          </CardBody>
        </Card>

        <Grid templateColumns={isMobile ? '1fr' : 'repeat(2, 1fr)'} gap={4}>
          <GridItem>
            <Card h="100%">
              <CardBody>
                <Heading as="h3" size={isMobile ? 'md' : 'lg'} mb={2}>
                  Summary
                </Heading>
                <Text fontSize={isMobile ? 'sm' : 'md'} lineHeight="tall">
                  {selectedTool.summary}
                </Text>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card h="100%">
              <CardBody>
                <Heading as="h3" size={isMobile ? 'md' : 'lg'} mb={2}>
                  Purpose
                </Heading>
                <Text fontSize={isMobile ? 'sm' : 'md'} lineHeight="tall">
                  {selectedTool.purpose}
                </Text>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        <Card>
          <CardBody>
            <Heading as="h3" size={isMobile ? 'md' : 'lg'} mb={2}>
              Description
            </Heading>
            <Text fontSize={isMobile ? 'sm' : 'md'} lineHeight="tall">
              {selectedTool.description}
            </Text>
          </CardBody>
        </Card>

        <Grid templateColumns={isMobile ? '1fr' : 'repeat(2, 1fr)'} gap={4}>
          <GridItem>
            <Card h="100%">
              <CardBody>
                <Heading as="h3" size={isMobile ? 'md' : 'lg'} mb={2}>
                  Intended Use
                </Heading>
                <Text fontSize={isMobile ? 'sm' : 'md'} lineHeight="tall">
                  {selectedTool.intended_use}
                </Text>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card h="100%">
              <CardBody>
                <Heading as="h3" size={isMobile ? 'md' : 'lg'} mb={2}>
                  Intended Audience
                </Heading>
                <Text fontSize={isMobile ? 'sm' : 'md'} lineHeight="tall">
                  {selectedTool.intended_audience}
                </Text>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        <Card>
          <CardBody>
            <Heading as="h3" size={isMobile ? 'md' : 'lg'} mb={2}>
              Categories
            </Heading>
            <Grid
              templateColumns={isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'}
              gap={2}
            >
              <VStack align="start">
                <Text fontWeight="bold" fontSize={isMobile ? 'xs' : 'sm'}>
                  Category:
                </Text>
                <Text fontSize={isMobile ? 'sm' : 'md'}>
                  {selectedTool.category}
                </Text>
              </VStack>
              <VStack align="start">
                <Text fontWeight="bold" fontSize={isMobile ? 'xs' : 'sm'}>
                  Sub-Category:
                </Text>
                <Text fontSize={isMobile ? 'sm' : 'md'}>
                  {selectedTool.sub_category}
                </Text>
              </VStack>
              <VStack align="start">
                <Text fontWeight="bold" fontSize={isMobile ? 'xs' : 'sm'}>
                  Group:
                </Text>
                <Text fontSize={isMobile ? 'sm' : 'md'}>
                  {selectedTool.group}
                </Text>
              </VStack>
              <VStack align="start">
                <Text fontWeight="bold" fontSize={isMobile ? 'xs' : 'sm'}>
                  Class:
                </Text>
                <Text fontSize={isMobile ? 'sm' : 'md'}>
                  {selectedTool.class}
                </Text>
              </VStack>
            </Grid>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading as="h3" size={isMobile ? 'md' : 'lg'} mb={2}>
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
                >
                  {keyword}
                </Tag>
              ))}
            </Box>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default DetailsPage;
