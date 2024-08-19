import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Link,
  useColorModeValue,
  HStack,
  Flex,
} from '@chakra-ui/react';

const PrivacyConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const brandPink = '#FF69B4';
  const brandBlue = useColorModeValue('#000080', '#F0F8FF');

  useEffect(() => {
    const consent = localStorage.getItem('privacyConsent');
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacyConsent', 'true');
    setShowBanner(false);
    (window as any).gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
    });
    window.location.reload(); // Reload to apply changes
  };

  const handleReject = () => {
    localStorage.setItem('privacyConsent', 'false');
    setShowBanner(false);
    (window as any).gtag('consent', 'update', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
    });
    // Disable analytics
    if ((window as any).ga) {
      window['ga-disable-' + import.meta.env.VITE_GA4_MEASUREMENT_ID] = true;
    }
    // Clear all localStorage data except for the consent status
    Object.keys(localStorage).forEach((key) => {
      if (key !== 'privacyConsent') {
        localStorage.removeItem(key);
      }
    });
    sessionStorage.clear(); // Clear all sessionStorage data
    window.location.reload(); // Reload to apply changes
  };

  if (!showBanner) return null;

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      p={4}
      bg={bgColor}
      boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
      borderTop={`4px solid ${brandPink}`}
      zIndex={1000}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        maxW="container.xl"
        mx="auto"
      >
        <Text color={textColor} mb={{ base: 4, md: 0 }}>
          We use analytics and local storage to improve your experience. Read
          our{' '}
          <Link color={brandPink} href="/privacy-policy" fontWeight="bold">
            Privacy Policy
          </Link>{' '}
          for more information.
        </Text>
        <HStack spacing={4}>
          <Button
            onClick={handleReject}
            color={brandBlue}
            variant="outline"
            _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
          >
            Reject
          </Button>
          <Button
            onClick={handleAccept}
            bg={brandPink}
            color="white"
            _hover={{ bg: 'pink.400' }}
          >
            Accept
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default PrivacyConsentBanner;
