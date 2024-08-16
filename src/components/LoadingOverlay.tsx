import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Image } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <VStack spacing={8}>
        <motion.div
          animate={{
            y: ["0%", "-20%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <Box bg="white" borderRadius="full" p={2}>
            <Image src="/src/assets/logo.png" alt="AweSearch Logo" boxSize="100px" padding={4}/>
          </Box>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTip}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              bg="white"
              borderRadius="md"
              p={6}
              boxShadow="lg"
              maxWidth="400px"
              textAlign="center"
            >
              <Text fontSize="lg">{currentTip}</Text>
            </Box>
          </motion.div>
        </AnimatePresence>
      </VStack>
    </Box>
  );
};

export default LoadingOverlay;