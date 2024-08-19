import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Button,
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
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2024 AweSearch. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <Link as={RouterLink} to="/privacy-policy" color={brandPink}>
            Privacy Policy
          </Link>
          <Button
            onClick={handlePrivacyUpdate}
            variant="link"
            color={brandBlue}
          >
            Update Privacy Settings
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
