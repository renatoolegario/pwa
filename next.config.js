// next.config.js
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  webpack: (config, { isServer }) => {
    // Apenas modifique o Webpack config para o lado do cliente
    if (!isServer) {
      config.plugins.push(
        new GenerateSW({
          swDest: 'public/sw.js', // Destino do Service Worker
          clientsClaim: true, // Reivindica imediatamente todos os clientes ativos para este service worker
          skipWaiting: true, // Pula a fase de espera durante a ativação do service worker
          // Adicione outras opções conforme necessário
        })
      );
    }

    return config;
  },
};
