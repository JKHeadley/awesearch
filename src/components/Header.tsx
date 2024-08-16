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
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.200');

  const logoSrc = useColorModeValue(
    '/src/assets/logo-light.png',
    '/src/assets/logo-dark.png',
  );

  return (
    <Box as="header" bg={bgColor} py={2}>
      <Flex maxW="container.xl" mx="auto" alignItems="center" px={4}>
        <Flex alignItems="center">
          <Image
            src={logoSrc}
            alt={'awesearch logo'}
            boxSize="100px"
            objectFit="contain"
            mr={4}
          />
          <Heading as="h3" size="md" fontWeight="normal" color={textColor}>
            awesomeness curated,
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
