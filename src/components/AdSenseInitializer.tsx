import React, { useEffect } from 'react';

const AdSenseInitializer: React.FC = () => {
  useEffect(() => {
    if (import.meta.env.PROD && import.meta.env.VITE_ADSENSE_CLIENT) {
      if (!(window as any).adsbygoogle) {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      }
      if (
        !document.querySelector(
          'script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]',
        )
      ) {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${
          import.meta.env.VITE_ADSENSE_CLIENT
        }`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);

        script.onload = () => {
          // Enable page-level ads
          ((window as any).adsbygoogle =
            (window as any).adsbygoogle || []).push({
            google_ad_client: import.meta.env.VITE_ADSENSE_CLIENT,
            enable_page_level_ads: true,
          });
        };
      }
    }
  }, []);

  return null;
};

export default AdSenseInitializer;
