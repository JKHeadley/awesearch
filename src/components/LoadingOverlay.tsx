import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Text,
  VStack,
  Image,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/store';
import {
  FIRST_TIP,
  firstTips,
  mainLoadingTips,
  additionalLoadingTips,
} from '../pages/ExampleQueries';

interface LoadingOverlayProps {
  isLoading: boolean;
}

type TipCategory = 'first' | 'main' | 'additional';

interface ShownTips {
  first: string[];
  main: string[];
  additional: string[];
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  const [currentTip, setCurrentTip] = useState('');
  const shownTipsRef = useRef<ShownTips>({
    first: [],
    main: [],
    additional: [],
  });
  const setGlobalShownTips = useStore((state) => state.setShownTips);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isMainTipRef = useRef(true);
  const intervalRef = useRef<any | null>(null);

  const FIRST_TIP_DURATION = 7000;
  const SUBSEQUENT_TIP_DURATION = 5000;

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

  const getNextTip = useCallback((category: TipCategory) => {
    const tipPool =
      category === 'first'
        ? firstTips
        : category === 'main'
        ? mainLoadingTips
        : additionalLoadingTips;
    const availableTips = tipPool.filter(
      (tip) => !shownTipsRef.current[category].includes(tip),
    );

    if (availableTips.length === 0) {
      shownTipsRef.current[category] = []; // Reset the category
      return tipPool[Math.floor(Math.random() * tipPool.length)];
    }

    return availableTips[Math.floor(Math.random() * availableTips.length)];
  }, []);

  const updateShownTips = useCallback((category: TipCategory, tip: string) => {
    shownTipsRef.current[category].push(tip);
  }, []);

  const changeTip = useCallback(() => {
    console.log('Changing tip');
    console.log(isMainTipRef.current);
    console.log(shownTipsRef.current);
    const category = isMainTipRef.current
      ? 'main'
      : ('additional' as TipCategory);
    const nextTip = getNextTip(category);
    setCurrentTip(nextTip);
    isMainTipRef.current = !isMainTipRef.current;
    updateShownTips(category, nextTip);
  }, [getNextTip, updateShownTips]);

  useEffect(() => {
    let isMounted = true;
    if (isLoading) {
      const hasSeenFirstTip = localStorage.getItem('hasSeenFirstTip');
      let initialTip: string;

      if (!hasSeenFirstTip) {
        initialTip = FIRST_TIP;
        localStorage.setItem('hasSeenFirstTip', 'true');
      } else {
        initialTip = getNextTip('first');
        updateShownTips('first', initialTip);
      }

      if (isMounted) setCurrentTip(initialTip);

      const firstInterval = setTimeout(
        () => {
          if (isMounted) {
            changeTip();
            intervalRef.current = setInterval(
              changeTip,
              initialTip === FIRST_TIP
                ? FIRST_TIP_DURATION
                : SUBSEQUENT_TIP_DURATION,
            );
          }
        },
        initialTip === FIRST_TIP ? FIRST_TIP_DURATION : SUBSEQUENT_TIP_DURATION,
      );

      return () => {
        isMounted = false;
        clearTimeout(firstInterval);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setGlobalShownTips(shownTipsRef.current);
      };
    } else {
      // Clear interval when not loading
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [isLoading, getNextTip, updateShownTips, changeTip, setGlobalShownTips]);

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
