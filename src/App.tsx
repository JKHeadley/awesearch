import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import Header from './components/Header';
import SearchPage from './pages/SearchPage';
import DetailsPage from './pages/DetailsPage';
import KeywordToolsPage from './pages/KeywordsToolsPage';
import NotFoundPage from './pages/NotFoundPage';
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import AdSenseInitializer from './components/AdSenseInitializer';
import theme from './theme';

const App: React.FC = () => {
  return (
    <>
      {/* <AdSenseInitializer /> */}
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Router>
          <GoogleAnalytics>
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/details/:id" element={<DetailsPage />} />
              <Route path="/keyword/:keyword" element={<KeywordToolsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </GoogleAnalytics>
        </Router>
      </ChakraProvider>
    </>
  );
};

export default App;
