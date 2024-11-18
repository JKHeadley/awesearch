import { Center, Spinner, VStack, Text } from '@chakra-ui/react';

const LoadingSpinner = () => (
  <Center h="50vh">
    <VStack spacing={4}>
      <Spinner 
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
      <Text>Loading...</Text>
    </VStack>
  </Center>
);

export default LoadingSpinner; 