import React, { useState, useEffect } from 'react';
import {
  Box,
  Textarea,
  Button,
  VStack,
  Text,
  HStack,
  useBreakpointValue,
  useColorModeValue,
  IconButton,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { RepeatIcon, CopyIcon, InfoIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';
import SearchResults from '../components/SearchResults';
import LoadingOverlay from '../components/LoadingOverlay';
import AdSense from '../components/AdSense';
import { searchDatabase } from '../api/search';
import { useStore } from '../store/store';
import { exampleQueries } from './ExampleQueries';
import ReactGA from 'react-ga4';
import { ReactGAEvent } from '../utils/react-ga-event';
import AboutModal from '../components/AboutModal';
import MetaTags from '../components/MetaTags';

const SearchPage: React.FC = () => {
  const {
    query,
    setQuery,
    searchResults,
    setSearchResults,
    isLoading,
    setIsLoading,
  } = useStore();
  const [placeholder, setPlaceholder] = useState('');
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const [privacyConsent, setPrivacyConsent] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const brandPink = '#FF69B4';
  const brandBlue = useColorModeValue('#000080', '#F0F8FF');

  const toast = useToast();
  const handleCopy = () => {
    navigator.clipboard
      .writeText(isPlaceholder ? placeholder : query)
      .then(() => {
        toast({
          title: 'Query copied',
          description: 'The query has been copied to your clipboard.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

        ReactGAEvent({
          category: 'Search',
          action: 'Copy Query',
          label: isPlaceholder ? placeholder : query,
        });
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        toast({
          title: 'Copy failed',
          description: 'Failed to copy the query. Please try again.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const getRandomQuery = () => {
    return exampleQueries[Math.floor(Math.random() * exampleQueries.length)];
  };

  useEffect(() => {
    setIsPlaceholder(exampleQueries.includes(query));
  }, [query]);

  useEffect(() => {
    const consent = localStorage.getItem('privacyConsent');
    setPrivacyConsent(consent);
    if (consent === 'true' && !query) {
      const randomQuery = getRandomQuery();
      setPlaceholder(randomQuery);
      setQuery(randomQuery);
      setIsPlaceholder(true);
    }
  }, [setQuery]);

  useEffect(() => {
    if (!query) {
      const randomQuery = getRandomQuery();
      setPlaceholder(randomQuery);
      setQuery(randomQuery);
      setIsPlaceholder(true);
    } else {
      setPlaceholder(query);
    }
  }, [setQuery]);

  const handleSearch = async () => {
    ReactGAEvent({
      category: 'Search',
      action: 'Perform Search',
      label: isPlaceholder ? placeholder : query,
    });

    if (isPlaceholder) {
      ReactGAEvent({
        category: 'Search',
        action: 'Perform Example Search',
        label: placeholder,
      });
    }
    setIsLoading(true);
    try {
      const results = await searchDatabase(isPlaceholder ? placeholder : query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error during search:', error);
      // Optionally, show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = () => {
    if (isPlaceholder) {
      setQuery('');
      setIsPlaceholder(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    setIsPlaceholder(false);
  };

  const handleTryAnother = () => {
    const newQuery = getRandomQuery();
    setPlaceholder(newQuery);
    setQuery(newQuery);
    setIsPlaceholder(true);

    ReactGAEvent({
      category: 'Search',
      action: 'Cycle Example Query',
      label: newQuery,
    });
  };

  return (
    <>
      <MetaTags
        title="AweSearch - Find the Perfect Development Tools"
        description="AweSearch helps developers and entrepreneurs discover the best tools and resources for their projects using AI-powered search."
        image={import.meta.env.OG_IMAGE_URL} // Replace with your actual OG image URL
        url="https://awesearch.app"
        type="website"
        siteName="AweSearch"
        // twitterHandle="@awesearch" // Replace with your actual Twitter handle
      />
      <Box
        maxW="container.xl"
        mx="auto"
        pb={16}
        mt={8}
        px={{ base: 4, md: 8, lg: 16 }}
        bg={bgColor}
        minH="calc(100vh - 100px)"
      >
        <LoadingOverlay isLoading={isLoading} />
        <VStack spacing={6} width="100%">
          <Text fontSize="lg" fontWeight="bold" color={brandBlue}>
            Try an example query or enter your own:
          </Text>
          <HStack width="100%" align="start">
            <VStack width="100%" align="start">
              <Textarea
                value={isPlaceholder ? placeholder : query}
                onChange={handleChange}
                onFocus={handleFocus}
                size={isMobile ? 'md' : 'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                borderColor={brandPink}
                _hover={{ borderColor: 'pink.400' }}
                _focus={{
                  borderColor: 'pink.400',
                  boxShadow: `0 0 0 1px ${brandPink}`,
                }}
                height="150px"
                resize="vertical"
              />
              <HStack>
                <Tooltip label="Try another example query">
                  <IconButton
                    aria-label="Try another query"
                    icon={<RepeatIcon />}
                    onClick={handleTryAnother}
                    colorScheme="pink"
                    size={isMobile ? 'sm' : 'md'}
                  />
                </Tooltip>
                <Tooltip label="Copy query">
                  <IconButton
                    aria-label="Copy query"
                    icon={<CopyIcon />}
                    onClick={handleCopy}
                    colorScheme="pink"
                    size={isMobile ? 'sm' : 'md'}
                    isDisabled={!(isPlaceholder ? placeholder : query).trim()}
                  />
                </Tooltip>

                <Tooltip label="Learn more about AweSearch">
                  <IconButton
                    aria-label="About AweSearch"
                    icon={<InfoIcon />}
                    onClick={() => {
                      ReactGAEvent({
                        category: 'Search',
                        action: 'Open About Modal',
                      });

                      onOpen();
                    }}
                    colorScheme="pink"
                    size={isMobile ? 'sm' : 'md'}
                  ></IconButton>
                </Tooltip>
              </HStack>
            </VStack>
          </HStack>
          <HStack width="100%" justifyContent="center" spacing={4}>
            <Button
              onClick={handleSearch}
              isLoading={isLoading}
              width={isMobile ? '100%' : 'auto'}
              size={isMobile ? 'md' : 'lg'}
              colorScheme="pink"
            >
              Search
            </Button>
          </HStack>
          <Text fontSize="sm" color="gray.500">
            Click Search to try the example query, or modify it for your
            specific needs. Use the refresh button to try another example.
          </Text>
          {privacyConsent === 'true' && <AdSense />}
          <SearchResults results={searchResults} />
        </VStack>
        <AboutModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
};

export default SearchPage;
