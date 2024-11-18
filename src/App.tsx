import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import PrivacyConsentBanner from './components/PrivacyConsentBanner';
import LoadingSpinner from './components/LoadingSpinner';
import theme from './theme';
import { useStore } from './store/store';
import { useScriptLoader } from './hooks/useScriptLoader';

// Lazy load with prefetch hints
const SearchPage = React.lazy(() => {
  const detailsPromise = import('./pages/DetailsPage');
  return import('./pages/SearchPage');
});

const DetailsPage = React.lazy(() => {
  const keywordPromise = import('./pages/KeywordsToolsPage');
  return import('./pages/DetailsPage');
});

// Other routes can be lazy loaded without prefetch
const KeywordToolsPage = React.lazy(() => import('./pages/KeywordsToolsPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const SitemapPage = React.lazy(() => import('./pages/SiteMapPage'));
const ContactPage = React.lazy(() => import('./pages/ConcatePage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = React.lazy(() => import('./pages/TermsOfServicePage'));

const App: React.FC = () => {
  const { privacyConsent, setPrivacyConsent } = useStore();

  useEffect(() => {
    const storedConsent = localStorage.getItem('privacyConsent');
    if (storedConsent) {
      setPrivacyConsent(storedConsent);
    }
  }, [setPrivacyConsent]);

  // Load third-party scripts only after consent
  useScriptLoader(
    [
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8758936595956434',
      'https://fundingchoicesmessages.google.com/i/pub-8758936595956434?ers=1'
    ],
    [privacyConsent]
  );

  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Router>
          <GoogleAnalytics>
            <ScrollToTop />
            <Header />
            <Suspense fallback={<LoadingSpinner />}>
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
            </Suspense>
            <Footer />
            {privacyConsent === null && <PrivacyConsentBanner />}
          </GoogleAnalytics>
        </Router>
      </ChakraProvider>
    </HelmetProvider>
  );
};

export default App;
