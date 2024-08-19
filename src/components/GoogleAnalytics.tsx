import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const GoogleAnalytics: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  useEffect(() => {
    const initGA = () => {
      const consent = localStorage.getItem('privacyConsent');
      if (consent === 'true') {
        ReactGA.initialize(import.meta.env.VITE_GA4_MEASUREMENT_ID);
      } else if (consent === 'false') {
        // Disable GA
        window['ga-disable-' + import.meta.env.VITE_GA4_MEASUREMENT_ID] = true;
      }
    };

    initGA();
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem('privacyConsent');
    if (consent === 'true') {
      ReactGA.send({ hitType: 'pageview', page: location.pathname });
    }
  }, [location]);

  return <>{children}</>;
};

export default GoogleAnalytics;