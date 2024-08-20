import React from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';

interface SearchHistoryProps {
  history: string[];
  onSelectQuery: (query: string) => void;
  onClearHistory: () => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onSelectQuery,
  onClearHistory,
}) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const brandPink = '#FF69B4';

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button
          leftIcon={<TimeIcon />}
          variant="outline"
          colorScheme="pink"
          size="sm"
        >
          History
        </Button>
      </PopoverTrigger>
      <PopoverContent bg={bgColor} borderColor={brandPink}>
        <PopoverArrow />
        <PopoverCloseButton top={3} right={3} />
        <PopoverBody pt={8} pb={4}>
          {' '}
          {/* Added top padding */}
          <VStack align="stretch" spacing={2}>
            {history.length > 0 ? (
              <>
                {history.map((query, index) => (
                  <Button
                    key={index}
                    onClick={() => onSelectQuery(query)}
                    variant="ghost"
                    justifyContent="flex-start"
                    whiteSpace="normal"
                    textAlign="left"
                    height="auto"
                    py={2}
                    color={textColor}
                  >
                    {query}
                  </Button>
                ))}
                <Button
                  onClick={onClearHistory}
                  colorScheme="pink"
                  size="sm"
                  mt={2}
                >
                  Clear History
                </Button>
              </>
            ) : (
              <Text color={textColor}>No search history available.</Text>
            )}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SearchHistory;
