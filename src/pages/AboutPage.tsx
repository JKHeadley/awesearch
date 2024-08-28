import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const AboutPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const brandPink = '#FF69B4';
  const brandBlue = useColorModeValue('#000080', '#F0F8FF');

  return (
    <Box maxW="container.xl" mx="auto" p={8} bg={bgColor} minH="100vh">
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" color={brandBlue}>
          About AweSearch
        </Heading>
        <Text color={textColor}>
          AweSearch is an innovative AI-powered search engine designed to help
          developers and entrepreneurs discover the perfect tools and resources
          for their projects. Our platform combines expert-curated sources,
          advanced semantic search, and AI-driven analysis to ensure you find
          the most relevant and high-quality resources tailored to your specific
          needs.
        </Text>
        <Text color={textColor}>Here's how AweSearch works:</Text>
        <VStack spacing={4} align="stretch" pl={4}>
          <Text color={textColor}>
            1. <strong>Curated Data Collection:</strong> We reference trusted
            developer sources, such as{' '}
            <Link
              href="https://github.com/sindresorhus/awesome"
              isExternal
              color={brandPink}
            >
              Awesome lists <ExternalLinkIcon mx="2px" />
            </Link>
            , to extract and maintain a comprehensive database of development
            tools and resources.
          </Text>
          <Text color={textColor}>
            2. <strong>Semantic Search:</strong> When you enter a query, our
            advanced vector database employs semantic search to identify tools
            and resources that are conceptually relevant to your needs, going
            beyond simple keyword matching.
          </Text>
          <Text color={textColor}>
            3. <strong>AI-Powered Analysis:</strong> Our sophisticated Large
            Language Model (LLM) then analyzes the initial results, scoring each
            tool based on how well it fulfills your specific query. This step
            ensures that the most appropriate solutions rise to the top.
          </Text>
          <Text color={textColor}>
            4. <strong>Personalized Insights:</strong> Finally, the LLM provides
            a tailored assessment for each result, explaining how it addresses
            your unique requirements and why it might be the right fit for your
            project.
          </Text>
        </VStack>
        <Text color={textColor}>
          By combining expert curation with cutting-edge AI technology,
          AweSearch delivers highly relevant, context-aware results that save
          you time and help you make informed decisions about the tools and
          resources for your development projects.
        </Text>
        <Heading as="h2" size="xl" color={brandPink} mt={8}>
          Frequently Asked Questions
        </Heading>
        <Accordion allowMultiple mt={4}>
          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  How does AweSearch work?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4} color={textColor}>
              AweSearch combines expert-curated data sources, semantic search,
              and AI analysis to find the most relevant tools for your needs. We
              use a vector database for semantic search, then apply an AI model
              to analyze and score the results based on your specific query.
              This process ensures that you receive highly relevant and
              personalized recommendations.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  What types of tools can I find on AweSearch?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4} color={textColor}>
              AweSearch covers a wide range of development tools, including but
              not limited to: programming languages, frameworks, libraries,
              IDEs, version control systems, CI/CD tools, cloud services,
              databases, and productivity tools for developers. Our AI-powered
              search is particularly adept at finding specific solutions for
              unique or complex queries.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  How often is the tool database updated?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4} color={textColor}>
              As AweSearch is currently in its early stages, we perform regular
              manual batch updates to our database. We're actively working
              towards implementing a system for continuous updates to ensure the
              most current information is always available. Despite being in
              early development, our curated database already contains a wealth
              of valuable tools and resources.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  How can I get the most out of AweSearch?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4} color={textColor}>
              To get the best results, be as specific as possible in your search
              queries. AweSearch excels at providing solutions for very specific
              needs. Include details about your project requirements, preferred
              programming languages, or specific features you're looking for.
              Our AI can understand complex queries and will provide tailored
              results. Don't hesitate to use natural language or even ask
              questions – our system is designed to understand and respond to a
              wide range of query formats.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Is AweSearch free to use?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4} color={textColor}>
              Yes, AweSearch is currently free to use. As we're in the early
              stages of development, we're focused on providing value to
              developers and gathering feedback to improve our service. We may
              introduce premium features in the future, but we're committed to
              always offering a valuable free tier.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  How does AweSearch compare to traditional search engines?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4} color={textColor}>
              Unlike traditional search engines, AweSearch is specifically
              designed for developers and focuses exclusively on development
              tools and resources. Our combination of curated data, semantic
              search, and AI analysis allows us to provide more relevant and
              insightful results for development-related queries. We excel at
              understanding complex, specific requests and can offer
              personalized explanations for why each tool might be suitable for
              your needs.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
};

export default AboutPage;
