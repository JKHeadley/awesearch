import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react';

const TermsOfServicePage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const brandBlue = useColorModeValue('#000080', '#F0F8FF');

  return (
    <Box maxW="container.xl" mx="auto" p={8} bg={bgColor} minH="100vh">
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl" color={brandBlue}>
          Terms of Service
        </Heading>
        <Text color={textColor}>
          Welcome to AweSearch. By using our website, you agree to comply with
          and be bound by the following terms and conditions of use.
        </Text>
        <Heading as="h2" size="xl" color={brandBlue}>
          1. Acceptance of Terms
        </Heading>
        <Text color={textColor}>
          By accessing or using AweSearch, you agree to be bound by these Terms
          of Service and all applicable laws and regulations. If you do not
          agree with any part of these terms, you may not use our service.
        </Text>
        <Heading as="h2" size="xl" color={brandBlue}>
          2. Use of Service
        </Heading>
        <Text color={textColor}>
          You agree to use AweSearch only for lawful purposes and in a way that
          does not infringe the rights of, restrict or inhibit anyone else's use
          and enjoyment of the website.
        </Text>
        <Heading as="h2" size="xl" color={brandBlue}>
          3. Intellectual Property
        </Heading>
        <Text color={textColor}>
          The content, organization, graphics, design, compilation, magnetic
          translation, digital conversion and other matters related to AweSearch
          are protected under applicable copyrights, trademarks and other
          proprietary rights.
        </Text>
        <Heading as="h2" size="xl" color={brandBlue}>
          4. Limitation of Liability
        </Heading>
        <Text color={textColor}>
          AweSearch and its affiliates are not liable for any damages arising
          out of or in connection with the use or inability to use this website
          or any linked websites.
        </Text>
        <Heading as="h2" size="xl" color={brandBlue}>
          5. Changes to Terms
        </Heading>
        <Text color={textColor}>
          We reserve the right to modify these terms at any time. Please review
          these terms periodically for changes.
        </Text>
      </VStack>
    </Box>
  );
};

export default TermsOfServicePage;
