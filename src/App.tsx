import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchPage from './pages/SearchPage';
import DetailsPage from './pages/DetailsPage';
import KeywordToolsPage from './pages/KeywordsToolsPage';
import AboutPage from './pages/AboutPage';
import SitemapPage from './pages/SiteMapPage';
import ContactPage from './pages/ConcatePage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import PrivacyConsentBanner from './components/PrivacyConsentBanner';
import theme from './theme';
import { useStore } from './store/store';
import TermsOfServicePage from './pages/TermsOfServicePage';
import { globalStyles } from './styles/global';

const App: React.FC = () => {
  const { privacyConsent, setPrivacyConsent } = useStore();

  useEffect(() => {
    const storedConsent = localStorage.getItem('privacyConsent');
    if (storedConsent) {
      setPrivacyConsent(storedConsent);
    }
  }, [setPrivacyConsent]);

  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <Global styles={globalStyles} />
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Router>
          <GoogleAnalytics>
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/details/:id" element={<DetailsPage />} />
              <Route path="/keyword/:keyword" element={<KeywordToolsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/ads.txt" element={null} />
            </Routes>
            <Footer />
            {privacyConsent === null && <PrivacyConsentBanner />}
          </GoogleAnalytics>
        </Router>
      </ChakraProvider>
    </HelmetProvider>
  );
};

export default App;
