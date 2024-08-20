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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
  keyframes,
  Link,
} from '@chakra-ui/react';
import { RepeatIcon, CopyIcon, InfoIcon, SpinnerIcon } from '@chakra-ui/icons';
import { FaMagic } from 'react-icons/fa';
import { useToast } from '@chakra-ui/react';
import SearchResults from '../components/SearchResults';
import LoadingOverlay from '../components/LoadingOverlay';
import AdSense from '../components/AdSense';
import { searchDatabase, awesomizeQuery } from '../api/search';
import { useStore } from '../store/store';
import { exampleQueries } from './ExampleQueries';
import { ReactGAEvent } from '../utils/react-ga-event';
import AboutModal from '../components/AboutModal';
import MetaTags from '../components/MetaTags';

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 105, 180, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(255, 105, 180, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 105, 180, 0);
  }
`;

const wiggleAnimation = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

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
  const [awesomizedQueries, setAwesomizedQueries] = useState<string[]>([]);
  const [isAwesomizing, setIsAwesomizing] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const {
    isOpen: isAwesomizeModalOpen,
    onOpen: onAwesomizeModalOpen,
    onClose: onAwesomizeModalClose,
  } = useDisclosure();

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
      toast({
        title: 'Search failed',
        description: 'An error occurred while searching. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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

  const handleAwesomizeQuery = async () => {
    if (!query.trim()) return;

    ReactGAEvent({
      category: 'Search',
      action: 'Awesomize Query',
      label: query,
    });

    setIsAwesomizing(true);
    try {
      const awesomized = await awesomizeQuery(query);
      setAwesomizedQueries(awesomized);
      onAwesomizeModalOpen();
    } catch (error) {
      console.error('Error awesomizing query:', error);
      toast({
        title: 'Error',
        description: 'Failed to awesomize the query. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsAwesomizing(false);
    }
  };

  const handleSelectAwesomizedQuery = (selectedQuery: string) => {
    setQuery(selectedQuery);
    setIsPlaceholder(false);
    onAwesomizeModalClose();

    ReactGAEvent({
      category: 'Search',
      action: 'Select Awesomized Query',
      label: selectedQuery,
    });
  };

  const handleAwesomizeClick = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
  };

  return (
    <>
      <MetaTags
        title="AweSearch - Find the Perfect Development Tools"
        description="AweSearch helps developers and entrepreneurs discover the best tools and resources for their projects using AI-powered search."
        image={import.meta.env.OG_IMAGE_URL}
        url="https://awesearch.app"
        type="website"
        siteName="AweSearch"
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
            Try an example query or{' '}
            <Link
              color={brandPink}
              fontWeight="bold"
              onClick={handleAwesomizeClick}
              cursor="pointer"
              textDecoration="underline"
            >
              awesomize
            </Link>{' '}
            your own:
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
                  />
                </Tooltip>
                <Tooltip label="Awesomize your query with AI">
                  <IconButton
                    aria-label="Awesomize query"
                    icon={isAwesomizing ? <SpinnerIcon /> : <FaMagic />}
                    onClick={handleAwesomizeQuery}
                    colorScheme="pink"
                    size={isMobile ? 'sm' : 'md'}
                    isLoading={isAwesomizing}
                    isDisabled={!query.trim()}
                    animation={`${pulseAnimation} 2s infinite, ${
                      isWiggling ? `${wiggleAnimation} 0.5s` : 'none'
                    }`}
                  />
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
            specific needs. Use the refresh button to try another example. Click
            the magic wand to awesomize your query with AI suggestions!
          </Text>
          {privacyConsent === 'true' && <AdSense />}
          <SearchResults results={searchResults} />
        </VStack>
        <AboutModal isOpen={isOpen} onClose={onClose} />

        {/* Awesomize Query Modal */}
        <Modal
          isOpen={isAwesomizeModalOpen}
          onClose={onAwesomizeModalClose}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Awesomized Query Options</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={4}>
                Choose an awesomized query to supercharge your search:
              </Text>
              <List spacing={3}>
                {awesomizedQueries.map((awesomizedQuery, index) => (
                  <ListItem key={index}>
                    <Button
                      onClick={() =>
                        handleSelectAwesomizedQuery(awesomizedQuery)
                      }
                      variant="outline"
                      colorScheme="pink"
                      width="100%"
                      justifyContent="flex-start"
                      whiteSpace="normal"
                      textAlign="left"
                      height="auto"
                      py={2}
                    >
                      {awesomizedQuery}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default SearchPage;
