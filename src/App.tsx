import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import NotFoundPage from './pages/NotFoundPage'; // Create this component
import Header from './components/Header';
import SearchPage from './pages/SearchPage';
import DetailsPage from './pages/DetailsPage';
import KeywordToolsPage from './pages/KeywordsToolsPage';
import ScrollToTop from './components/ScrollToTop';
import theme from './theme'; // You'll need to create this

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/keyword/:keyword" element={<KeywordToolsPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Add this line */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
