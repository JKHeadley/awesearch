import React, { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Image, Heading, Text, Button, VStack, HStack, Badge } from '@chakra-ui/react';
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
    <Box maxW="container.xl" mx="auto" mt={8}>
      <LoadingOverlay isLoading={isLoading} />
      <Button as={RouterLink} to="/" mb={4}>
        Back to Search Results
      </Button>
      <VStack align="stretch" spacing={4}>
        <HStack>
          <Image src={selectedTool.logo || '/src/assets/logo.png'} alt={selectedTool.name} boxSize="100px" objectFit="contain" />
          <Box>
            <Heading as="h2" size="xl">
              {selectedTool.name}
            </Heading>
            <Text>
              <a href={selectedTool.url} target="_blank" rel="noopener noreferrer">
                {selectedTool.url}
              </a>
            </Text>
          </Box>
        </HStack>
        <Text>{selectedTool.analysis}</Text>
        <HStack>
          <Badge colorScheme={selectedTool.open_source ? 'green' : 'red'}>
            {selectedTool.open_source ? 'Open Source' : 'Closed Source'}
          </Badge>
          <Badge colorScheme={selectedTool.free ? 'green' : 'red'}>
            {selectedTool.free ? 'Free' : 'Paid'}
          </Badge>
        </HStack>
        <Box>
          <Heading as="h3" size="md">
            Summary
          </Heading>
          <Text>{selectedTool.summary}</Text>
        </Box>
        {/* Add more sections for purpose, description, intended use, etc. */}
      </VStack>
    </Box>
  );
};

export default DetailsPage;