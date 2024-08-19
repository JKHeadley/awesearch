exports.handler = async function (event, context) {
  const publisherId = process.env.VITE_ADSENSE_CLIENT;
  const adsTxtContent = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
    body: adsTxtContent,
  };
};
