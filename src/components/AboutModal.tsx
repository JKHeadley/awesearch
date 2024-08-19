import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  useColorModeValue,
  Image,
  Flex,
  Link,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { ReactGAEvent } from '../utils/react-ga-event';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const bgColor = useColorModeValue('white', 'gray.700');
  const brandPink = '#FF69B4';
  const brandBlue = useColorModeValue('#000080', '#F0F8FF');
  const linkColor = useColorModeValue('blue.600', 'blue.300');

  const logoSrc = useColorModeValue(
    import.meta.env.VITE_LOGO_DARK_URL,
    import.meta.env.VITE_LOGO_LIGHT_URL,
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader padding={0}>
          <Flex alignItems="center" justifyContent="center" pt={4} pb={2}>
            <Image
              src={logoSrc}
              alt="AweSearch Logo"
              boxSize="80px"
              objectFit="contain"
            />
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="start">
            <Text color={textColor}>
              AweSearch is an innovative AI-powered search engine designed to
              help developers and entrepreneurs discover the perfect tools and
              resources for their projects.
            </Text>
            <Text color={textColor}>
              Our platform leverages AI technology to extract and process tools
              from lists curated by field experts, including{' '}
              <Link
                href="https://github.com/sindresorhus/awesome"
                isExternal
                color={linkColor}
                onClick={() => {
                  ReactGAEvent({
                    category: 'About',
                    action: 'External Link Click',
                    label: 'awesome lists',
                  });
                }}
              >
                awesome lists <ExternalLinkIcon mx="2px" />
              </Link>
              , ensuring a high-quality, up-to-date database of resources.
            </Text>
            <Text color={textColor} fontWeight="bold">
              How it works:
            </Text>
            <VStack spacing={2} align="start" pl={4}>
              <Text color={textColor}>
                1. Enter your query describing the tool or resource you need.
              </Text>
              <Text color={textColor}>
                2. Our AI, powered by Large Language Models (LLMs), analyzes
                your request and searches our curated database.
              </Text>
              <Text color={textColor}>
                3. We present you with a list of the most relevant tools,
                complete with descriptions and insights.
              </Text>
              <Text color={textColor}>
                4. Click on a tool to view more details and find the perfect
                match for your project.
              </Text>
            </VStack>
            <Text color={textColor}>
              Whether you're searching for development frameworks, design tools,
              or business resources, AweSearch harnesses the power of AI to
              accelerate your project and boost your productivity.
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="pink" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AboutModal;
