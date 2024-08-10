import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Image, Heading, Text, Button, VStack, HStack, Badge } from '@chakra-ui/react';
import { getToolDetails } from '../api/search';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<any>(null);

  useEffect(() => {
    const fetchToolDetails = async () => {
      if (id) {
        const details = await getToolDetails(id);
        setTool(details);
      }
    };
    fetchToolDetails();
  }, [id]);

  if (!tool) return <Text>Loading...</Text>;

  return (
    <Box maxW="container.xl" mx="auto" mt={8}>
      <Button as={RouterLink} to="/" mb={4}>
        Back to Search Results
      </Button>
      <VStack align="stretch" spacing={4}>
        <HStack>
          <Image src={tool.logo || '/devdiveai_logo.png'} alt={tool.name} boxSize="100px" objectFit="contain" />
          <Box>
            <Heading as="h2" size="xl">
              {tool.name}
            </Heading>
            <Text>
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                {tool.url}
              </a>
            </Text>
          </Box>
        </HStack>
        <Text>{tool.analysis}</Text>
        <HStack>
          <Badge colorScheme={tool.openSource ? 'green' : 'red'}>
            {tool.openSource ? 'Open Source' : 'Closed Source'}
          </Badge>
          <Badge colorScheme={tool.free ? 'green' : 'red'}>
            {tool.free ? 'Free' : 'Paid'}
          </Badge>
        </HStack>
        <Box>
          <Heading as="h3" size="md">
            Summary
          </Heading>
          <Text>{tool.summary}</Text>
        </Box>
        {/* Add more sections for purpose, description, intended use, etc. */}
      </VStack>
    </Box>
  );
};

export default DetailsPage;