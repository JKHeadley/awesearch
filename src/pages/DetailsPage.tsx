import React, { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
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

  const logoSrc = useColorModeValue(
    '/src/assets/logo-light.png',
    '/src/assets/logo-dark.png',
  );

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
      mt={8}
      pt={4}
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
        leftIcon={<ChevronLeftIcon />}
        size="lg"
        colorScheme="blue"
        variant="outline"
      >
        Back to Search Results
      </Button>
      <VStack align="stretch" spacing={8}>
        <Card>
          <CardBody>
            <HStack spacing={8} align="flex-start">
              <Image
                src={selectedTool.logo || logoSrc}
                alt={selectedTool.name}
                boxSize="150px"
                objectFit="contain"
              />
              <Box>
                <Heading as="h1" size="2xl" mb={2}>
                  {selectedTool.name}
                </Heading>
                <Link
                  href={selectedTool.url}
                  isExternal
                  color="blue.500"
                  fontSize="xl"
                >
                  {selectedTool.url} <ExternalLinkIcon mx="2px" />
                </Link>
                <HStack mt={4}>
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
              </Box>
            </HStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading as="h2" size="xl" mb={4}>
              AI Analysis
            </Heading>
            <Text fontSize="lg" lineHeight="tall">
              {selectedTool.analysis}
            </Text>
          </CardBody>
        </Card>

        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <GridItem>
            <Card h="100%">
              <CardBody>
                <Heading as="h3" size="lg" mb={4}>
                  Summary
                </Heading>
                <Text lineHeight="tall">{selectedTool.summary}</Text>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card h="100%">
              <CardBody>
                <Heading as="h3" size="lg" mb={4}>
                  Purpose
                </Heading>
                <Text lineHeight="tall">{selectedTool.purpose}</Text>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        <Card>
          <CardBody>
            <Heading as="h3" size="lg" mb={4}>
              Description
            </Heading>
            <Text lineHeight="tall">{selectedTool.description}</Text>
          </CardBody>
        </Card>

        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <GridItem>
            <Card h="100%">
              <CardBody>
                <Heading as="h3" size="lg" mb={4}>
                  Intended Use
                </Heading>
                <Text lineHeight="tall">{selectedTool.intended_use}</Text>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card h="100%">
              <CardBody>
                <Heading as="h3" size="lg" mb={4}>
                  Intended Audience
                </Heading>
                <Text lineHeight="tall">{selectedTool.intended_audience}</Text>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        <Card>
          <CardBody>
            <Heading as="h3" size="lg" mb={4}>
              Categories
            </Heading>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              <VStack align="start">
                <Text fontWeight="bold">Category:</Text>
                <Text>{selectedTool.category}</Text>
              </VStack>
              <VStack align="start">
                <Text fontWeight="bold">Sub-Category:</Text>
                <Text>{selectedTool.sub_category}</Text>
              </VStack>
              <VStack align="start">
                <Text fontWeight="bold">Group:</Text>
                <Text>{selectedTool.group}</Text>
              </VStack>
              <VStack align="start">
                <Text fontWeight="bold">Class:</Text>
                <Text>{selectedTool.class}</Text>
              </VStack>
            </Grid>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading as="h3" size="lg" mb={4}>
              Keywords
            </Heading>
            <HStack spacing={2} flexWrap="wrap">
              {selectedTool.keywords.map((keyword, index) => (
                <Tag
                  key={index}
                  size="lg"
                  colorScheme="blue"
                  borderRadius="full"
                  cursor="pointer"
                >
                  {keyword}
                </Tag>
              ))}
            </HStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default DetailsPage;
