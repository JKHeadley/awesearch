import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
  Link,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@chakra-ui/icons';

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const headingColor = useColorModeValue('#000080', '#F0F8FF'); // brandBlue
  const brandPink = '#FF69B4';

  return (
    <Box maxW="container.xl" mx="auto" p={8} bg={bgColor} minH="100vh">
      <VStack spacing={6} align="stretch">
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={() => navigate(-1)}
          alignSelf="flex-start"
          mb={4}
          colorScheme="pink"
          variant="outline"
        >
          Back
        </Button>

        <Heading as="h1" size="2xl" color={headingColor}>
          Privacy Policy
        </Heading>

        <Text color={textColor}>Last updated: 08/19/2024</Text>

        <Text color={textColor}>
          At AweSearch, we are committed to protecting your privacy and ensuring
          you have a positive experience on our website. This policy outlines
          our data collection and use practices.
        </Text>

        <Heading as="h2" size="xl" color={headingColor}>
          1. Information We Collect
        </Heading>

        <Text color={textColor}>
          We collect information to provide better services to all our users. We
          collect the following types of information:
        </Text>

        <UnorderedList pl={5} color={textColor}>
          <ListItem>
            Information you provide to us: This includes search queries you
            enter on our site.
          </ListItem>
          <ListItem>
            Information we get from your use of our services: We collect data
            about how you interact with our website, including:
            <UnorderedList pl={5}>
              <ListItem>
                Usage Data: Details of how you used our service, such as your
                search queries, clicks on search results, and interactions with
                specific tools.
              </ListItem>
              <ListItem>
                Device Information: We collect device-specific information such
                as your hardware model, operating system version, unique device
                identifiers, and mobile network information.
              </ListItem>
              <ListItem>
                Log Information: When you use our services or view content
                provided by AweSearch, we automatically collect and store
                certain information in server logs. This includes details of how
                you used our service, such as your search queries.
              </ListItem>
              <ListItem>
                Location Information: When you use AweSearch, we may collect and
                process information about your actual location.
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>

        <Heading as="h2" size="xl" color={headingColor}>
          2. How We Use Information We Collect
        </Heading>

        <Text color={textColor}>
          We use the information we collect from all our services to provide,
          maintain, protect and improve them, to develop new ones, and to
          protect AweSearch and our users. We also use this information to offer
          you tailored content – like giving you more relevant search results
          and ads.
        </Text>

        <Heading as="h2" size="xl" color={headingColor}>
          3. Information We Share
        </Heading>

        <Text color={textColor}>
          We do not share personal information with companies, organizations and
          individuals outside of AweSearch unless one of the following
          circumstances applies:
        </Text>

        <UnorderedList pl={5} color={textColor}>
          <ListItem>With your consent</ListItem>
          <ListItem>
            For external processing (our affiliates or other trusted businesses
            or persons to process it for us)
          </ListItem>
          <ListItem>For legal reasons</ListItem>
        </UnorderedList>

        <Heading as="h2" size="xl" color={headingColor}>
          4. Information Security
        </Heading>

        <Text color={textColor}>
          We work hard to protect AweSearch and our users from unauthorized
          access to or unauthorized alteration, disclosure or destruction of
          information we hold.
        </Text>

        <Heading as="h2" size="xl" color={headingColor}>
          5. Changes
        </Heading>

        <Text color={textColor}>
          Our Privacy Policy may change from time to time. We will post any
          privacy policy changes on this page and, if the changes are
          significant, we will provide a more prominent notice.
        </Text>

        <Heading as="h2" size="xl" color={headingColor}>
          6. Contact Us
        </Heading>

        <Text color={textColor}>
          If you have any questions about this Privacy Policy, please contact us
          at:{' '}
          <Link href="mailto:justin@inkwell-ai.com" color={brandPink}>
            justin@inkwell-ai.com
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default PrivacyPolicyPage;
