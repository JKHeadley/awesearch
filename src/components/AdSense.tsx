import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
  style?: React.CSSProperties;
}

const AdSense: React.FC<AdSenseProps> = ({ style }) => {
  const adRef = useRef<any>(null);

  useEffect(() => {
    try {
      if (adRef.current) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {},
        );
      }
    } catch (error) {
      console.error('Error displaying AdSense ad:', error);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT}
      data-ad-slot="AUTO"
      data-ad-format="auto"
      data-full-width-responsive="true"
      ref={adRef}
    />
  );
};

export default AdSense;
