import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box textAlign="center" mt={10}>
      <h1>Welcome to AweSearch</h1>
      <Button colorScheme="blue" mt={4}>
        <Link to="/report">Go to Report</Link>
      </Button>
    </Box>
  );
};

export default HomePage;
