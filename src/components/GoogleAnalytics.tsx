import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from "react-ga4";

// Initialize GA with your tracking ID
ReactGA.initialize(import.meta.env.VITE_GA4_MEASUREMENT_ID);

const GoogleAnalytics: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Send pageview with a custom path
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return <>{children}</>;
};

export default GoogleAnalytics;