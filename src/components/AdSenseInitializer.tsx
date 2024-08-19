import React, { useEffect } from 'react';

const AdSenseInitializer: React.FC = () => {
  useEffect(() => {
    if (
      import.meta.env.PROD &&
      import.meta.env.VITE_ADSENSE_CLIENT &&
      !(window as any).adsbygoogle
    ) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${
        import.meta.env.VITE_ADSENSE_CLIENT
      }`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);

      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
    }
  }, []);

  return null;
};

export default AdSenseInitializer;
