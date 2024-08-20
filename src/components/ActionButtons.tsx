import React from 'react';
import { HStack, IconButton, Tooltip, keyframes } from '@chakra-ui/react';
import { RepeatIcon, CopyIcon, InfoIcon, SpinnerIcon } from '@chakra-ui/icons';
import { FaMagic } from 'react-icons/fa';

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 105, 180, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(255, 105, 180, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 105, 180, 0);
  }
`;

const wiggleAndExpandAnimation = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-10deg) scale(1.2); }
  50% { transform: rotate(10deg) scale(1.4); }
  75% { transform: rotate(-5deg) scale(1.2); }
  100% { transform: rotate(0deg) scale(1); }
`;

interface ActionButtonsProps {
  handleTryAnother: () => void;
  handleCopy: () => void;
  handleAbout: () => void;
  handleAwesomizeQuery: () => void;
  isAwesomizing: boolean;
  isWiggling: boolean;
  isMobile: boolean;
  isDisabled: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  handleTryAnother,
  handleCopy,
  handleAbout,
  handleAwesomizeQuery,
  isAwesomizing,
  isWiggling,
  isMobile,
  isDisabled,
}) => {
  return (
    <HStack>
      <Tooltip label="Try another example query">
        <IconButton
          aria-label="Try another query"
          icon={<RepeatIcon />}
          onClick={handleTryAnother}
          colorScheme="pink"
          size={isMobile ? 'sm' : 'md'}
        />
      </Tooltip>
      <Tooltip label="Copy query">
        <IconButton
          aria-label="Copy query"
          icon={<CopyIcon />}
          onClick={handleCopy}
          colorScheme="pink"
          size={isMobile ? 'sm' : 'md'}
          isDisabled={isDisabled}
        />
      </Tooltip>
      <Tooltip label="Learn more about AweSearch">
        <IconButton
          aria-label="About AweSearch"
          icon={<InfoIcon />}
          onClick={handleAbout}
          colorScheme="pink"
          size={isMobile ? 'sm' : 'md'}
        />
      </Tooltip>
      <Tooltip label="Awesomize your query with AI">
        <IconButton
          aria-label="Awesomize query"
          icon={isAwesomizing ? <SpinnerIcon /> : <FaMagic />}
          onClick={handleAwesomizeQuery}
          colorScheme="pink"
          size={isMobile ? 'sm' : 'md'}
          isLoading={isAwesomizing}
          isDisabled={isDisabled}
          animation={`${pulseAnimation} 2s infinite, ${
            isWiggling ? `${wiggleAndExpandAnimation} 0.5s` : 'none'
          }`}
        />
      </Tooltip>
    </HStack>
  );
};

export default ActionButtons;
