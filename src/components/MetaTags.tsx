import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
  siteName?: string;
  twitterHandle?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  siteName = 'AweSearch',
  twitterHandle = '@awesearch', // Replace with your actual Twitter handle
}) => {
  return (
    <Helmet>
      {/* Standard meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:site" content={twitterHandle} />

      {/* Additional helpful tags */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default MetaTags;
