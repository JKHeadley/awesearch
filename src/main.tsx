import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
