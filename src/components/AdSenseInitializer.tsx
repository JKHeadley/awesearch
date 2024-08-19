import React, { useEffect } from 'react';

const AdSenseInitializer: React.FC = () => {
  useEffect(() => {
    try {
      if (import.meta.env.VITE_ADSENSE_CLIENT) {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${
          import.meta.env.VITE_ADSENSE_CLIENT
        }`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);

        script.onload = () => {
          // Initialize AdSense after the script has loaded
          ((window as any).adsbygoogle =
            (window as any).adsbygoogle || []).push({});
        };
      }
    } catch (error) {
      console.error('Error initializing AdSense:', error);
    }
  }, []);

  return null;
};

export default AdSenseInitializer;
