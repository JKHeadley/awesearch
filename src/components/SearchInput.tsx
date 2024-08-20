import React from 'react';
import {
  Textarea,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onClear: () => void;
  isMobile: boolean;
  brandPink: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onFocus,
  onClear,
  isMobile,
  brandPink,
}) => {
  return (
    <InputGroup>
      <Textarea
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        size={isMobile ? 'md' : 'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        borderColor={brandPink}
        _hover={{ borderColor: 'pink.400' }}
        _focus={{
          borderColor: 'pink.400',
          boxShadow: `0 0 0 1px ${brandPink}`,
        }}
        height="150px"
        resize="vertical"
        pr="40px" // Make room for the clear button
      />
      <InputRightElement top="10px" right="10px">
        <IconButton
          aria-label="Clear search"
          icon={<CloseIcon />}
          size="sm"
          onClick={onClear}
          variant="ghost"
          isRound
          _hover={{ bg: 'pink.100' }}
          display={value ? 'flex' : 'none'}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
