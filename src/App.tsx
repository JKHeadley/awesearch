import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, ColorModeScript, Box, Flex } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchPage from './pages/SearchPage';
import DetailsPage from './pages/DetailsPage';
import KeywordToolsPage from './pages/KeywordsToolsPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import PrivacyConsentBanner from './components/PrivacyConsentBanner';
import theme from './theme';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Router>
          <GoogleAnalytics>
            <ScrollToTop />
            <Flex flexDirection="column" minHeight="100vh">
              <Header />
              <Box flex="1">
                <Routes>
                  <Route path="/" element={<SearchPage />} />
                  <Route path="/details/:id" element={<DetailsPage />} />
                  <Route
                    path="/keyword/:keyword"
                    element={<KeywordToolsPage />}
                  />
                  <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicyPage />}
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Box>
              <Footer />
            </Flex>
            <PrivacyConsentBanner />
          </GoogleAnalytics>
        </Router>
      </ChakraProvider>
    </HelmetProvider>
  );
};

export default App;
