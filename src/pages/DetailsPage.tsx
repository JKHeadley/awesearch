import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Grid,
  GridItem,
  Link,
  Tag,
  Card,
  CardBody,
  useColorModeValue,
  useBreakpointValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tooltip,
  IconButton,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ExternalLinkIcon,
  CopyIcon,
  InfoIcon,
} from '@chakra-ui/icons';
import LoadingOverlay from '../components/LoadingOverlay';
import { getToolDetails, ToolTag } from '../api/search';
import { useStore } from '../store/store';
import { ReactGAEvent } from '../utils/react-ga-event';
import MetaTags from '../components/MetaTags';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedTool, setSelectedTool, isLoading, setIsLoading } = useStore();
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [tags, setTags] = useState<ToolTag[]>([]);

  // Brand color scheme
  const brandPink = '#FF69B4'; // Adjust this to match your exact pink
  const brandBlue = useColorModeValue('#000080', '#F0F8FF'); // Dark blue for light mode, light blue/gray for dark mode
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const accordionBgColor = useColorModeValue('blue.50', 'blue.900');
  const accordionColor = useColorModeValue(brandBlue, brandPink);

  const logoSrc = useColorModeValue(
    import.meta.env.VITE_LOGO_DARK_URL,
    import.meta.env.VITE_LOGO_LIGHT_URL,
  );
  const isMobile = useBreakpointValue({ base: true, md: false });

  const analysisFromState = location.state?.analysis;

  useEffect(() => {
    const fetchToolDetails = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const details = await getToolDetails(id);
          const toolTags = details.tags.flatMap((tag) => tag.tag);
          setTags(toolTags);
          setSelectedTool(details);
        } catch (error) {
          console.error('Error fetching tool details:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchToolDetails();
  }, [id, setSelectedTool, setIsLoading]);

  const copyToClipboard = (text: string) => {
    ReactGAEvent({
      category: 'Tool',
      action: 'Copy URL',
      label: text,
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!selectedTool) return <LoadingOverlay isLoading={isLoading} />;

  return (
    <>
      <MetaTags
        title={`${selectedTool.name} - AweSearch Tool Details`}
        description={
          selectedTool.summary ||
          `Learn more about ${selectedTool.name} and how it can help your development process.`
        }
        image={selectedTool.logo || import.meta.env.OG_IMAGE_URL} // Use tool logo if available, otherwise default
        url={`https://awesearch.app/details/${id}`}
        type="article"
        siteName="AweSearch"
        // twitterHandle="@awesearch" // Replace with your actual Twitter handle
      />
      <Box
        maxW="container.xl"
        mx="auto"
        mt={8}
        pb={16}
        px={4}
        bg={bgColor}
        minH="100vh"
      >
        <LoadingOverlay isLoading={isLoading} />
        <Button
          as={RouterLink}
          to="/"
          mb={6}
          mt={4}
          leftIcon={<ChevronLeftIcon />}
          size={isMobile ? 'md' : 'lg'}
          colorScheme="pink"
          variant="outline"
          width={isMobile ? 'full' : 'auto'}
        >
          Back to Search Results
        </Button>
        <VStack align="stretch" spacing={8}>
          <Card bg={cardBgColor} boxShadow="md">
            <CardBody>
              <Flex
                direction={isMobile ? 'column' : 'row'}
                align={isMobile ? 'center' : 'start'}
                justify="space-between"
                wrap="wrap"
              >
                <Flex
                  direction="column"
                  align={isMobile ? 'center' : 'start'}
                  mb={isMobile ? 4 : 0}
                  minW={isMobile ? 'auto' : '200px'}
                  width={isMobile ? '100%' : 'auto'}
                >
                  <Image
                    src={selectedTool.logo || logoSrc}
                    alt={selectedTool.name}
                    boxSize={isMobile ? '80px' : '150px'}
                    objectFit="contain"
                    mb={4}
                  />
                  <HStack
                    spacing={2}
                    mt={2}
                    justify={isMobile ? 'center' : 'flex-start'}
                    width="100%"
                  >
                    <Badge
                      colorScheme={selectedTool.open_source ? 'green' : 'red'}
                      fontSize="md"
                      px={2}
                      py={1}
                    >
                      {selectedTool.open_source
                        ? 'Open Source'
                        : 'Closed Source'}
                    </Badge>
                    <Badge
                      colorScheme={selectedTool.free ? 'green' : 'red'}
                      fontSize="md"
                      px={2}
                      py={1}
                    >
                      {selectedTool.free ? 'Free' : 'Paid'}
                    </Badge>
                  </HStack>
                </Flex>
                <VStack
                  align={isMobile ? 'center' : 'start'}
                  flex={1}
                  ml={isMobile ? 0 : 8}
                  spacing={4}
                  width={isMobile ? '100%' : 'auto'}
                >
                  <Heading
                    as="h1"
                    size={isMobile ? 'xl' : '2xl'}
                    color={brandBlue}
                    textAlign={isMobile ? 'center' : 'left'}
                  >
                    {selectedTool.name}
                  </Heading>
                  <HStack
                    justify={isMobile ? 'center' : 'flex-start'}
                    width="100%"
                  >
                    <Link
                      href={selectedTool.url}
                      isExternal
                      color={brandPink}
                      fontSize={isMobile ? 'md' : 'lg'}
                      onClick={() => {
                        ReactGAEvent({
                          category: 'Tool',
                          action: 'Visit Website',
                          label: selectedTool.url,
                        });
                      }}
                    >
                      {selectedTool.url} <ExternalLinkIcon mx="2px" />
                    </Link>
                    <Tooltip label={copied ? 'Copied!' : 'Copy URL'}>
                      <IconButton
                        aria-label="Copy URL"
                        icon={<CopyIcon />}
                        size="sm"
                        onClick={() => copyToClipboard(selectedTool.url)}
                        colorScheme="pink"
                      />
                    </Tooltip>
                  </HStack>
                </VStack>
              </Flex>
            </CardBody>
          </Card>

          <Accordion allowMultiple defaultIndex={[0]}>
            {analysisFromState || selectedTool.analysis ? (
              <AccordionItem>
                <h2>
                  <AccordionButton
                    bg={accordionBgColor}
                    _hover={{ bg: accordionBgColor }}
                  >
                    <Box flex="1" textAlign="left">
                      <Heading
                        as="h2"
                        size={isMobile ? 'lg' : 'xl'}
                        color={accordionColor}
                      >
                        AI Analysis
                      </Heading>
                    </Box>
                    <AccordionIcon color={accordionColor} />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} bg={cardBgColor}>
                  <Text
                    fontSize={isMobile ? 'md' : 'lg'}
                    lineHeight="tall"
                    color={textColor}
                  >
                    {analysisFromState || selectedTool.analysis}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            ) : null}

            <AccordionItem>
              <h2>
                <AccordionButton
                  bg={accordionBgColor}
                  _hover={{ bg: accordionBgColor }}
                  onClick={() => {
                    ReactGAEvent({
                      category: 'Tool',
                      action: 'View Summary and Description',
                      label: selectedTool.url,
                    });
                  }}
                >
                  <Box flex="1" textAlign="left">
                    <Heading
                      as="h2"
                      size={isMobile ? 'lg' : 'xl'}
                      color={accordionColor}
                    >
                      Summary and Description
                    </Heading>
                  </Box>
                  <AccordionIcon color={accordionColor} />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} bg={cardBgColor}>
                <VStack align="stretch" spacing={4}>
                  <Box>
                    <Heading as="h3" size="md" mb={2} color={brandBlue}>
                      Summary
                    </Heading>
                    <Text
                      fontSize={isMobile ? 'sm' : 'md'}
                      lineHeight="tall"
                      color={textColor}
                    >
                      {selectedTool.summary}
                    </Text>
                  </Box>
                  <Box>
                    <Heading as="h3" size="md" mb={2} color={brandBlue}>
                      Description
                    </Heading>
                    <Text
                      fontSize={isMobile ? 'sm' : 'md'}
                      lineHeight="tall"
                      color={textColor}
                    >
                      {selectedTool.description}
                    </Text>
                  </Box>
                </VStack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton
                  bg={accordionBgColor}
                  _hover={{ bg: accordionBgColor }}
                  onClick={() => {
                    ReactGAEvent({
                      category: 'Tool',
                      action: 'View Purpose and Use',
                      label: selectedTool.url,
                    });
                  }}
                >
                  <Box flex="1" textAlign="left">
                    <Heading
                      as="h2"
                      size={isMobile ? 'lg' : 'xl'}
                      color={accordionColor}
                    >
                      Purpose and Use
                    </Heading>
                  </Box>
                  <AccordionIcon color={accordionColor} />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} bg={cardBgColor}>
                <Grid
                  templateColumns={isMobile ? '1fr' : 'repeat(2, 1fr)'}
                  gap={4}
                >
                  <GridItem>
                    <Heading as="h3" size="md" mb={2} color={brandBlue}>
                      Purpose
                    </Heading>
                    <Text
                      fontSize={isMobile ? 'sm' : 'md'}
                      lineHeight="tall"
                      color={textColor}
                    >
                      {selectedTool.purpose}
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Heading as="h3" size="md" mb={2} color={brandBlue}>
                      Intended Use
                    </Heading>
                    <Text
                      fontSize={isMobile ? 'sm' : 'md'}
                      lineHeight="tall"
                      color={textColor}
                    >
                      {selectedTool.intended_use}
                    </Text>
                  </GridItem>
                  <GridItem colSpan={isMobile ? 1 : 2}>
                    <Heading as="h3" size="md" mb={2} color={brandBlue}>
                      Intended Audience
                    </Heading>
                    <Text
                      fontSize={isMobile ? 'sm' : 'md'}
                      lineHeight="tall"
                      color={textColor}
                    >
                      {selectedTool.intended_audience}
                    </Text>
                  </GridItem>
                </Grid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Card bg={cardBgColor}>
            <CardBody>
              <Heading
                as="h3"
                size={isMobile ? 'md' : 'lg'}
                mb={4}
                color={brandBlue}
              >
                Categories
              </Heading>
              <Grid
                templateColumns={isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'}
                gap={4}
              >
                {['category', 'sub_category', 'group', 'class'].map((field) => (
                  <VStack key={field} align="start">
                    <Text
                      fontWeight="bold"
                      fontSize={isMobile ? 'xs' : 'sm'}
                      color={brandPink}
                    >
                      {field.charAt(0).toUpperCase() +
                        field.slice(1).replace('_', '-')}
                      :
                    </Text>
                    <Text fontSize={isMobile ? 'sm' : 'md'} color={textColor}>
                      {selectedTool[field]}
                    </Text>
                  </VStack>
                ))}
              </Grid>
            </CardBody>
          </Card>

          <Card bg={cardBgColor}>
            <CardBody>
              <Heading
                as="h3"
                size={isMobile ? 'md' : 'lg'}
                mb={4}
                color={brandBlue}
              >
                Keywords
              </Heading>
              <Box>
                {tags.map((tag, index) => (
                  <Tag
                    key={index}
                    size={isMobile ? 'sm' : 'md'}
                    colorScheme="pink"
                    borderRadius="full"
                    cursor="pointer"
                    m={1}
                    _hover={{ bg: brandPink, color: 'white' }}
                    as={RouterLink}
                    to={`/keyword/${encodeURIComponent(tag.name)}`}
                    onClick={() => {
                      ReactGAEvent({
                        category: 'Tool',
                        action: 'Browse by Tag',
                        label: tag.name,
                      });
                    }}
                  >
                    {tag.displayName}
                  </Tag>
                ))}
              </Box>
            </CardBody>
          </Card>

          <HStack justify="center" mt={8}>
            <Button
              as={Link}
              href={selectedTool.url}
              isExternal
              colorScheme="pink"
              rightIcon={<ExternalLinkIcon />}
              onClick={() => {
                ReactGAEvent({
                  category: 'Tool',
                  action: 'Visit Website',
                  label: selectedTool.url,
                });
              }}
            >
              Visit Website
            </Button>
            <Button
              leftIcon={<InfoIcon />}
              onClick={() => {
                /* Implement share functionality */
              }}
              colorScheme="blue"
            >
              Share
            </Button>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default DetailsPage;
