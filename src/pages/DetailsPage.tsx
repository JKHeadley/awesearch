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
  Tag
} from '@chakra-ui/react';
import { ChevronLeftIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import LoadingOverlay from '../components/LoadingOverlay';
import { getToolDetails } from '../api/search';
import { useStore } from '../store/store';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedTool, setSelectedTool, isLoading, setIsLoading } = useStore();

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
    <Box maxW="container.xl" mx="auto" mt={8} pb={16} px={4}>
      <LoadingOverlay isLoading={isLoading} />
      <Button as={RouterLink} to="/" mb={4} leftIcon={<ChevronLeftIcon />}>
        Back to Search Results
      </Button>
      <VStack align="stretch" spacing={8}>
        <HStack spacing={8} align="flex-start">
          <Image 
            src={selectedTool.logo || '/src/assets/logo.png'} 
            alt={selectedTool.name} 
            boxSize="150px" 
            objectFit="contain"
          />
          <Box>
            <Heading as="h1" size="2xl" mb={2}>
              {selectedTool.name}
            </Heading>
            <Link href={selectedTool.url} isExternal color="blue.500" fontSize="lg">
              {selectedTool.url} <ExternalLinkIcon mx="2px" />
            </Link>
            <HStack mt={4}>
              <Badge colorScheme={selectedTool.open_source ? 'green' : 'red'} fontSize="md">
                {selectedTool.open_source ? 'Open Source' : 'Closed Source'}
              </Badge>
              <Badge colorScheme={selectedTool.free ? 'green' : 'red'} fontSize="md">
                {selectedTool.free ? 'Free' : 'Paid'}
              </Badge>
            </HStack>
          </Box>
        </HStack>

        <Box>
          <Heading as="h2" size="xl" mb={4}>
            AI Analysis
          </Heading>
          <Text fontSize="lg">{selectedTool.analysis}</Text>
        </Box>

        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <GridItem>
            <Heading as="h3" size="lg" mb={2}>
              Summary
            </Heading>
            <Text>{selectedTool.summary}</Text>
          </GridItem>
          <GridItem>
            <Heading as="h3" size="lg" mb={2}>
              Purpose
            </Heading>
            <Text>{selectedTool.purpose}</Text>
          </GridItem>
        </Grid>

        <Divider />

        <Box>
          <Heading as="h3" size="lg" mb={4}>
            Description
          </Heading>
          <Text>{selectedTool.description}</Text>
        </Box>

        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <GridItem>
            <Heading as="h3" size="lg" mb={2}>
              Intended Use
            </Heading>
            <Text>{selectedTool.intended_use}</Text>
          </GridItem>
          <GridItem>
            <Heading as="h3" size="lg" mb={2}>
              Intended Audience
            </Heading>
            <Text>{selectedTool.intended_audience}</Text>
          </GridItem>
        </Grid>

        <Box>
          <Heading as="h3" size="lg" mb={4}>
            Categories
          </Heading>
          <HStack spacing={4}>
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
          </HStack>
        </Box>

        <Box>
          <Heading as="h3" size="lg" mb={4}>
            Keywords
          </Heading>
          <HStack spacing={2} flexWrap="wrap">
            {selectedTool.keywords.map((keyword, index) => (
              <Tag key={index} size="lg" colorScheme="blue" borderRadius="full">
                {keyword}
              </Tag>
            ))}
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default DetailsPage;