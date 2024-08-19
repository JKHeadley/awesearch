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
        console.log('GA ID: ', import.meta.env.VITE_GA4_MEASUREMENT_ID);

        // Load Google tag script
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${
          import.meta.env.VITE_GA4_MEASUREMENT_ID
        }`;
        document.head.appendChild(gtagScript);

        gtagScript.onload = () => {
          ReactGA.initialize(import.meta.env.VITE_GA4_MEASUREMENT_ID);
        };
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
