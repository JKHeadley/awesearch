import React from 'react';
import { Box, Heading, Flex, Image } from '@chakra-ui/react';

const Header: React.FC = () => {
    return (
        <Box as="header" bg="gray.100" py={0}>
            <Flex maxW="container.xl" mx="auto" alignItems="center">
                <Heading as="h1" size="xl">
                    <Image src={'/src/assets/logo.png'} alt={'awesearch logo'} boxSize="125px" objectFit="contain" />
                </Heading>
                <Heading as="h3" size="md" ml={4} fontWeight="normal">
                    awesomeness curated, development accelerated
                </Heading>
            </Flex>
        </Box>
    );
};

export default Header;