import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Button,
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const brandPink = '#FF69B4';
  const brandBlue = useColorModeValue('#000080', '#F0F8FF');

  const handlePrivacyUpdate = () => {
    localStorage.removeItem('privacyConsent');
    window.location.reload();
  };

  return (
    <Box
      bg={bgColor}
      color={textColor}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container maxW={'6xl'} py={4}>
        <VStack spacing={4} align="stretch">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'center', md: 'center' }}
            spacing={4}
          >
            <Text textAlign={{ base: 'center', md: 'left' }}>
              © 2024 AweSearch. All rights reserved
            </Text>
            <HStack spacing={4} justify="center" wrap="wrap">
              <Link as={RouterLink} to="/privacy-policy" color={brandPink}>
                Privacy Policy
              </Link>
              <Link as={RouterLink} to="/contact" color={brandPink}>
                Contact Us
              </Link>
              <Link
                as={RouterLink}
                to="/sitemap"
                color={textColor}
                fontSize="sm"
              >
                Sitemap
              </Link>
            </HStack>
          </Stack>

          <Divider />

          <VStack spacing={2} align="stretch">
            <Button
              onClick={handlePrivacyUpdate}
              variant="link"
              color={brandBlue}
              width="full"
            >
              Update Privacy Settings
            </Button>
            <Button
              as={Link}
              href="#"
              variant="link"
              color={textColor}
              fontSize="sm"
              width="full"
            >
              Do Not Sell or Share My Personal Information
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
