import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  List,
  ListItem,
  Button,
} from '@chakra-ui/react';

interface AwesomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  awesomizedQueries: string[];
  handleSelectAwesomizedQuery: (query: string) => void;
}

const AwesomizeModal: React.FC<AwesomizeModalProps> = ({
  isOpen,
  onClose,
  awesomizedQueries,
  handleSelectAwesomizedQuery,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
                  onClick={() => handleSelectAwesomizedQuery(awesomizedQuery)}
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
  );
};

export default AwesomizeModal;
