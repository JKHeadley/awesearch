import React, { useState, useEffect } from 'react';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

const tips = [
  "AweSearch uses AI to find the perfect tools for your needs.",
  "Our database includes thousands of developer tools and resources.",
  "AweSearch can help you discover both open-source and commercial solutions.",
  "Use specific keywords to get more targeted results.",
  "AweSearch is constantly updated with the latest developer tools.",
  "Looking for a specific technology? Include it in your search query!",
  "AweSearch can help you find alternatives to your current tools.",
  "Don't forget to check the 'View Details' for in-depth information about each tool.",
];

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  const [currentTip, setCurrentTip] = useState(tips[0]);

  useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(() => {
        setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
      }, 5000); // Change tip every 5 seconds

      return () => clearInterval(intervalId);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor="rgba(0, 0, 0, 0.7)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
    >
      <VStack spacing={4}>
        <Spinner size="xl" color="white" />
        <Text color="white" fontWeight="bold" fontSize="xl">
          Loading...
        </Text>
        <Text color="white" textAlign="center" maxWidth="80%">
          {currentTip}
        </Text>
      </VStack>
    </Box>
  );
};

export default LoadingOverlay;