import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
  style?: React.CSSProperties;
  adSlot?: string;
}

const AdSense: React.FC<AdSenseProps> = ({ style, adSlot }) => {
  const adRef = useRef<any>(null);

  useEffect(() => {
    if (import.meta.env.PROD && adRef.current && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {},
        );
      } catch (error) {
        console.error('Error displaying AdSense ad:', error);
      }
    }
  }, []);

  if (!import.meta.env.PROD) {
    return (
      <div
        style={{
          ...style,
          backgroundColor: '#f0f0f0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px dashed #888',
        }}
      >
        AdSense Placeholder
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT}
      data-ad-slot={adSlot || 'AUTO'}
      data-ad-format="auto"
      data-full-width-responsive="true"
      ref={adRef}
    />
  );
};

export default AdSense;