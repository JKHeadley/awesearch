import ReactGA from 'react-ga4';

export const ReactGAEvent = ({
  category,
  action,
  label,
}: {
  category: string;
  action: string;
  label?: string;
}) => {
  const consent = localStorage.getItem('privacyConsent');

  if (consent === 'true') {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};
