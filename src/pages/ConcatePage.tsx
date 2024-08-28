import React, { useRef, useEffect } from 'react';
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
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useForm, ValidationError } from '@formspree/react';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const ContactForm: React.FC = () => {
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const [state, handleSubmit] = useForm(formId);
  const toast = useToast();
  const recaptchaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Render reCAPTCHA when the component mounts
    if (recaptchaRef.current && window.grecaptcha) {
      window.grecaptcha.render(recaptchaRef.current, {
        sitekey: recaptchaSiteKey,
      });
    }
  }, [recaptchaSiteKey]);

  useEffect(() => {
    if (state.succeeded) {
      toast({
        title: 'Message sent.',
        description: "We'll get back to you soon!",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      toast({
        title: 'Error sending message.',
        description: 'Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [state.succeeded, state.errors, toast]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recaptchaValue = window.grecaptcha.getResponse();
    if (!recaptchaValue) {
      toast({
        title: 'reCAPTCHA required',
        description: 'Please complete the reCAPTCHA.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    await handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit}>
      <VStack spacing={4}>
        {state.errors && Object.keys(state.errors).length > 0 && (
          <Alert status="error">
            <AlertIcon />
            There was an error sending your message. Please try again.
          </Alert>
        )}
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
        <Box ref={recaptchaRef} />
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
