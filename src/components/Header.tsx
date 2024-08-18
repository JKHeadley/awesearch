import React from 'react';
import {
  Box,
  Image,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import ColorModeToggle from './ColorModeToggle';

const Header: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('#000080', '#F0F8FF'); // brandBlue
  const brandPink = '#FF69B4';

  const logoSrc = useColorModeValue(
    import.meta.env.VITE_LOGO_DARK_URL,
    import.meta.env.VITE_LOGO_LIGHT_URL,
  );

  return (
    <Box as="header" bg={bgColor} py={3} boxShadow="sm">
      <Flex maxW="container.xl" mx="auto" alignItems="center" px={4}>
        <Flex alignItems="center">
          <Image
            src={logoSrc}
            alt={'awesearch logo'}
            boxSize="80px"
            objectFit="contain"
            mr={4}
          />
          <Heading as="h3" size="md" fontWeight="normal" color={textColor}>
            <Box as="span" color={brandPink}>
              awesomeness
            </Box>{' '}
            curated,
            <br />
            development accelerated
          </Heading>
        </Flex>
        <Spacer />
        <ColorModeToggle />
      </Flex>
    </Box>
  );
};

export default Header;
