import React, { useState, useEffect, Suspense } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  HStack,
  useBreakpointValue,
  useColorModeValue,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
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
import SearchInput from '../components/SearchInput';
import ActionButtons from '../components/ActionButtons';
import AwesomizeModal from '../components/AwesomizeModal';
import SearchHistory from '../components/SearchHistory';

const SearchPage: React.FC = () => {
  const {
    query,
    setQuery,
    searchResults,
    setSearchResults,
    isLoading,
    setIsLoading,
    privacyConsent,
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
  } = useStore();

  const [placeholder, setPlaceholder] = useState('');
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const [awesomizedQueries, setAwesomizedQueries] = useState<string[]>([]);
  const [isAwesomizing, setIsAwesomizing] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const getRandomQuery = () => {
    return exampleQueries[Math.floor(Math.random() * exampleQueries.length)];
  };

  useEffect(() => {
    setIsPlaceholder(exampleQueries.includes(query));
  }, [query]);

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

  const handleClearQuery = () => {
    setQuery('');
    setIsPlaceholder(false);
    setPlaceholder(getRandomQuery());

    ReactGAEvent({
      category: 'Search',
      action: 'Clear Query',
    });
  };

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

    const searchQuery = isPlaceholder ? placeholder : query;
    addToSearchHistory(searchQuery);

    setIsLoading(true);
    try {
      const results = await searchDatabase(searchQuery);
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

  const handleSelectHistoryQuery = (selectedQuery: string) => {
    setQuery(selectedQuery);
    setIsPlaceholder(false);
    ReactGAEvent({
      category: 'Search',
      action: 'Select History Query',
      label: selectedQuery,
    });
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

  // Pre-render the help text content immediately
  const helpText = "Click Search to try the example query, or modify it for your specific needs. Use the refresh button to try another example. Click the magic wand to awesomize your query with AI suggestions!";

  // Separate the critical content into its own component
  const CriticalContent = () => (
    <VStack spacing={6} width="100%">
      <Text 
        fontSize="lg" 
        fontWeight="bold" 
        color={brandBlue}
        dangerouslySetInnerHTML={{
          __html: 'Try an example query or <span style="color: #FF69B4; font-weight: bold; cursor: pointer; text-decoration: underline">awesomize</span> your own:'
        }}
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName === 'SPAN') {
            handleAwesomizeClick();
          }
        }}
      />
      <VStack width="100%" align="start">
        <SearchInput
          value={isPlaceholder ? placeholder : query}
          onChange={handleChange}
          onFocus={handleFocus}
          onClear={handleClearQuery}
          isMobile={isMobile}
          brandPink={brandPink}
        />
        <HStack width="100%" justifyContent="space-between">
          <ActionButtons
            handleTryAnother={handleTryAnother}
            handleCopy={handleCopy}
            handleAbout={() => {
              ReactGAEvent({
                category: 'Search',
                action: 'Open About Modal',
              });
              onOpen();
            }}
            handleAwesomizeQuery={handleAwesomizeQuery}
            isAwesomizing={isAwesomizing}
            isWiggling={isWiggling}
            isMobile={isMobile}
            isDisabled={!(isPlaceholder ? placeholder : query).trim()}
          />
          <SearchHistory
            history={searchHistory}
            onSelectQuery={handleSelectHistoryQuery}
            onClearHistory={clearSearchHistory}
            privacyConsent={privacyConsent === 'true'}
          />
        </HStack>
      </VStack>
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
      {/* Render help text immediately without style props that could block rendering */}
      <Text 
        as="p"
        fontSize="sm" 
        color="gray.500"
        textAlign="left"
        maxW="600px"
        mx="auto"
      >
        {helpText}
      </Text>
    </VStack>
  );

  // Defer non-critical content
  const NonCriticalContent = React.lazy(() => Promise.resolve({
    default: () => (
      <>
        {privacyConsent === 'true' && <AdSense />}
        <SearchResults results={searchResults} />
      </>
    )
  }));

  return (
    <>
      <MetaTags
        title="AweSearch - Find the Perfect Development Tools | AI-Powered Search"
        description="AweSearch helps developers and entrepreneurs discover the best tools and resources for their projects using AI-powered search. Find curated development tools, frameworks, and libraries to accelerate your project."
        image={import.meta.env.OG_IMAGE_URL}
        url="https://awesearch.app"
        type="website"
        siteName="AweSearch"
        keywords="developer tools, software development, programming resources, AI search, curated tools"
        author="Inkwell AI"
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
        <CriticalContent />
        <Suspense fallback={null}>
          <NonCriticalContent />
        </Suspense>
        <AboutModal isOpen={isOpen} onClose={onClose} />
        <AwesomizeModal
          isOpen={isAwesomizeModalOpen}
          onClose={onAwesomizeModalClose}
          awesomizedQueries={awesomizedQueries}
          handleSelectAwesomizedQuery={handleSelectAwesomizedQuery}
        />
      </Box>
    </>
  );
};

export default SearchPage;
