const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    workbox: {
      runtimeCaching: [
        {
          urlPattern: '/*',
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 20, // Tempo limite para a rede
            cacheMaxAgeSeconds: 60 * 60 * 24, // Tempo máximo de armazenamento em cache (1 dia)
          },
        },
      ],
    },
  },
});
