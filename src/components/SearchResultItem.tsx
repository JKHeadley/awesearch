import React from 'react';
import { Box, Image, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useStore } from '../store/store';

interface SearchResultItemProps {
    result: any;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result }) => {
    const { setSelectedTool } = useStore();

    const handleSelectTool = () => {
        console.log("Selected Tool: ", result);
        setSelectedTool(result);
    }
    return (
        <Box borderWidth={1} borderRadius="lg" p={4}>
            <Flex>
                <Image src={result.logo || '/src/assets/logo.png'} alt={result.name} boxSize="100px" objectFit="contain" />
                <Box ml={4}>
                    <Heading as="h2" size="md">
                        <a href={result.url} target="_blank" rel="noopener noreferrer">
                            {result.name}
                        </a>
                    </Heading>
                    <Text>Score: {result.score}</Text>
                    <Text mt={2}>{result.analysis}</Text>
                    <Button as={RouterLink} to={`/details/${result._id}`} mt={2} onClick={handleSelectTool} >
                        View Details
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
};

export default SearchResultItem;