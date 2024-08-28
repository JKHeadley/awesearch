import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useForm('mvgplqpq');
  const toast = useToast();

  if (state.succeeded) {
    toast({
      title: 'Message sent.',
      description: "We'll get back to you soon!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input id="email" type="email" name="email" />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="message">Message</FormLabel>
          <Textarea id="message" name="message" />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </FormControl>
        <Button
          type="submit"
          disabled={state.submitting}
          colorScheme="pink"
          width="full"
        >
          Submit
        </Button>
      </VStack>
    </form>
  );
};

const ContactPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const brandBlue = useColorModeValue('#000080', '#F0F8FF');

  return (
    <Box maxW="container.xl" mx="auto" p={8} bg={bgColor} minH="100vh">
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" color={brandBlue}>
          Contact Us
        </Heading>
        <Text color={textColor}>
          Have a question or feedback? We'd love to hear from you! Fill out the
          form below and we'll get back to you as soon as possible.
        </Text>
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          p={8}
          borderRadius="md"
          boxShadow="md"
        >
          <ContactForm />
        </Box>
      </VStack>
    </Box>
  );
};

export default ContactPage;
