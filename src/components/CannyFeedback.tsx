import React, { useEffect } from 'react';
import { useStore } from '../store/store';
import { ReactGAEvent } from '../utils/react-ga-event';

interface CannyFeedbackProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    Canny: any;
  }
}

const CannyFeedback: React.FC<CannyFeedbackProps> = ({ children }) => {
  const { privacyConsent } = useStore();

  useEffect(() => {
    if (privacyConsent === 'true') {
      !(function (w, d, i, s) {
        function l() {
          if (!d.getElementById(i)) {
            var f = d.getElementsByTagName(s)[0],
              e = d.createElement(s);
            (e.type = 'text/javascript'),
              (e.async = !0),
              (e.src = 'https://canny.io/sdk.js'),
              f.parentNode.insertBefore(e, f);
          }
        }
        if ('function' != typeof w.Canny) {
          var c = function () {
            c.q.push(arguments);
          };
          (c.q = []),
            (w.Canny = c),
            'complete' === d.readyState
              ? l()
              : w.attachEvent
              ? w.attachEvent('onload', l)
              : w.addEventListener('load', l, !1);
        }
      })(window, document, 'canny-jssdk', 'script');

      window.Canny('identify', {
        appID: import.meta.env.VITE_CANNY_APP_ID,
      });
    }
  }, [privacyConsent]);

  const handleClick = () => {
    ReactGAEvent({
      category: 'Feedback',
      action: 'Open Canny',
      label: 'Feedback Button Click',
    });
  };

  return (
    <a
      data-canny-link
      href={import.meta.env.VITE_CANNY_BOARD_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export default CannyFeedback; 