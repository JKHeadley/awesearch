import React from 'react';
import { Textarea, useColorModeValue } from '@chakra-ui/react';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  isMobile: boolean;
  brandPink: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onFocus,
  isMobile,
  brandPink,
}) => {
  return (
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
    />
  );
};

export default SearchInput;
