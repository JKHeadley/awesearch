import { useEffect } from 'react';

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

export const useScriptLoader = (scripts: string[], dependencies: any[] = []) => {
  useEffect(() => {
    const loadScripts = async () => {
      try {
        await Promise.all(scripts.map(src => loadScript(src)));
      } catch (error) {
        console.error('Failed to load scripts:', error);
      }
    };

    window.addEventListener('load', loadScripts);
    return () => window.removeEventListener('load', loadScripts);
  }, dependencies);
}; 