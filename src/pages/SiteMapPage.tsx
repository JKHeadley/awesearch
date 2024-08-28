import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Link,
  List,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const SitemapPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const brandBlue = useColorModeValue('#000080', '#F0F8FF');
  const brandPink = '#FF69B4';

  const sitemapStructure = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Contact Us', path: '/contact' },
    // {
    //   name: 'Tool Categories',
    //   children: [
    //     { name: 'IDEs', path: '/category/ides' },
    //     { name: 'Frameworks', path: '/category/frameworks' },
    //     { name: 'Version Control', path: '/category/version-control' },
    //     // Add more categories as needed
    //   ],
    // },
  ];

  const renderSitemapItems = (items) => (
    <List spacing={2} ml={4}>
      {items.map((item, index) => (
        <ListItem key={index}>
          <Link as={RouterLink} to={item.path} color={brandPink}>
            {item.name}
          </Link>
          {item.children && renderSitemapItems(item.children)}
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box maxW="container.xl" mx="auto" p={8} bg={bgColor} minH="100vh">
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl" color={brandBlue}>
          Sitemap
        </Heading>
        <Box color={textColor}>{renderSitemapItems(sitemapStructure)}</Box>
      </VStack>
    </Box>
  );
};

export default SitemapPage;
