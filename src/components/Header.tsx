import React from 'react';
import {
  Box,
  Image,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
  Link,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ColorModeToggle from './ColorModeToggle';
import SideMenu from './SideMenu';

const Header: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('#000080', '#F0F8FF'); // brandBlue
  const brandPink = '#FF69B4';

  const logoSrc = useColorModeValue(
    import.meta.env.VITE_LOGO_DARK_URL,
    import.meta.env.VITE_LOGO_LIGHT_URL,
  );

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box as="header" bg={bgColor} py={3} boxShadow="sm">
      <Flex
        maxW="container.xl"
        mx="auto"
        alignItems="center"
        px={4}
        flexWrap={isMobile ? 'wrap' : 'nowrap'}
      >
        {isMobile && (
          <Flex width="100%" justifyContent="space-between" mb={2}>
            <SideMenu />
            <ColorModeToggle />
          </Flex>
        )}
        {!isMobile && <SideMenu />}
        <Flex alignItems="center" justifyContent="center" flex={1}>
          <Link as={RouterLink} to="/" display="flex" alignItems="center">
            <Image
              src={logoSrc}
              alt={'awesearch logo'}
              boxSize={isMobile ? '60px' : '80px'}
              objectFit="contain"
              mr={2}
            />
            <VStack align="start" spacing={0}>
              <Heading
                as="h3"
                size={isMobile ? 'sm' : 'md'}
                fontWeight="normal"
                color={textColor}
                lineHeight="1.2"
              >
                <Box as="span" color={brandPink}>
                  awesomeness
                </Box>{' '}
                curated,
              </Heading>
              <Heading
                as="h3"
                size={isMobile ? 'sm' : 'md'}
                fontWeight="normal"
                color={textColor}
                lineHeight="1.2"
              >
                development accelerated
              </Heading>
            </VStack>
          </Link>
        </Flex>
        {!isMobile && <ColorModeToggle />}
      </Flex>
    </Box>
  );
};

export default Header;
