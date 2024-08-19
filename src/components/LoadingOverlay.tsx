import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Text,
  VStack,
  Image,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  mainLoadingTips,
  additionalLoadingTips,
} from '../pages/ExampleQueries';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  const [currentTip, setCurrentTip] = useState('');
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isMainTip, setIsMainTip] = useState(true);

  const getNextTip = useCallback(() => {
    if (isMainTip) {
      const nextTip =
        additionalLoadingTips[
          Math.floor(Math.random() * additionalLoadingTips.length)
        ];
      setCurrentTip(nextTip);
      setIsMainTip(false);
    } else {
      const nextTip =
        mainLoadingTips[Math.floor(Math.random() * mainLoadingTips.length)];
      setCurrentTip(nextTip);
      setIsMainTip(true);
    }
  }, [isMainTip]);

  const logoSrc = useColorModeValue(
    import.meta.env.VITE_LOGO_DARK_URL,
    import.meta.env.VITE_LOGO_LIGHT_URL,
  );

  // Color mode values
  const overlayBg = useColorModeValue(
    'rgba(0, 0, 0, 0.7)',
    'rgba(0, 0, 0, 0.7)',
  );
  const logoBg = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const shadowColor = useColorModeValue(
    'rgba(0, 0, 0, 0.1)',
    'rgba(255, 255, 255, 0.1)',
  );

  // Grab the first tip from the main list
  useEffect(() => {
    const randomTip =
      mainLoadingTips[Math.floor(Math.random() * mainLoadingTips.length)];
    setCurrentTip(randomTip);
  }, []);

  useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(getNextTip, 5000); // Change tip every 5 seconds
      return () => clearInterval(intervalId);
    }
  }, [isLoading, getNextTip]);

  if (!isLoading) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor={overlayBg}
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
      p={4}
    >
      <VStack spacing={isMobile ? 4 : 8} maxWidth="100%">
        <motion.div
          animate={{
            y: ['0%', '-20%', '0%'],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <Box
            bg={logoBg}
            borderRadius="full"
            p={isMobile ? 1 : 2}
            boxShadow={`0 0 10px ${shadowColor}`}
          >
            <Image
              src={logoSrc}
              alt="AweSearch Logo"
              boxSize={isMobile ? '60px' : '100px'}
              padding={isMobile ? 2 : 4}
            />
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
              bg={cardBg}
              color={textColor}
              borderRadius="md"
              p={isMobile ? 4 : 6}
              boxShadow={`0 4px 6px ${shadowColor}`}
              maxWidth={isMobile ? '300px' : '400px'}
              width="100%"
              textAlign="center"
            >
              <Text fontSize={isMobile ? 'md' : 'lg'}>{currentTip}</Text>
            </Box>
          </motion.div>
        </AnimatePresence>
      </VStack>
    </Box>
  );
};

export default LoadingOverlay;
