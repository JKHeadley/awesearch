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

    // Update consent state
    (window as any).gtag('consent', 'update', {
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      ad_storage: 'granted',
      analytics_storage: 'granted',
    });

    // Reload the page to ensure all components respect the new consent state
    window.location.reload();
  };

  const handleReject = () => {
    localStorage.setItem('privacyConsent', 'false');
    setShowBanner(false);

    // Update consent state to keep everything denied
    (window as any).gtag('consent', 'update', {
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      ad_storage: 'denied',
      analytics_storage: 'denied',
    });

    // Clear all localStorage data except for the consent status
    Object.keys(localStorage).forEach((key) => {
      if (key !== 'privacyConsent') {
        localStorage.removeItem(key);
      }
    });
    sessionStorage.clear(); // Clear all sessionStorage data

    // Reload the page to ensure all components respect the new consent state
    window.location.reload();
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
