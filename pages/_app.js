// _app.js
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('Service Worker registrado com sucesso:', registration.scope);
        }).catch(error => {
          console.error('Falha ao registrar o Service Worker:', error);
        });
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
