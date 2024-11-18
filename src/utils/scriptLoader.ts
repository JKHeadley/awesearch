const loadScript = (src: string, async = true, defer = true): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
};

export const loadThirdPartyScripts = async (): Promise<void> => {
  // Load non-critical scripts after page load
  window.addEventListener('load', () => {
    loadScript('https://www.google.com/recaptcha/api.js');
    loadScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8758936595956434');
    // Add other third-party scripts here
  });
}; 