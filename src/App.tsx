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
import theme from './theme';

const App: React.FC = () => {
  useEffect(() => {
    if (import.meta.env.VITE_ADSENSE_CLIENT) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${
        import.meta.env.VITE_ADSENSE_CLIENT
      }`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);

      // Enable Auto Ads
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({
        google_ad_client: import.meta.env.VITE_ADSENSE_CLIENT,
        enable_page_level_ads: true,
      });
    }
  }, []);

  return (
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
  );
};

export default App;
