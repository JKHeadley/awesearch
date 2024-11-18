import { Image, ImageProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface OptimizedImageProps extends ImageProps {
  src: string;
  lowResSrc?: string;
}

const OptimizedImage = ({ src, lowResSrc, alt, ...props }: OptimizedImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(lowResSrc || src);

  useEffect(() => {
    if (lowResSrc) {
      const img = document.createElement('img');
      img.src = src;
      img.onload = () => setCurrentSrc(src);
    }
  }, [src, lowResSrc]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};

export default OptimizedImage; 