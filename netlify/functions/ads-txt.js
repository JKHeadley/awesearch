exports.handler = async function (event, context) {
  console.log('ads-txt function triggered');

  const publisherId = process.env.VITE_ADSENSE_CLIENT;
  console.log('Publisher ID:', publisherId);

  if (!publisherId) {
    console.error('VITE_ADSENSE_CLIENT environment variable is not set');
    return {
      statusCode: 500,
      body: 'Server configuration error',
    };
  }

  const adsTxtContent = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`;
  console.log('ads.txt content:', adsTxtContent);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
    body: adsTxtContent,
  };
};
