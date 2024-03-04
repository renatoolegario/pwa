module.exports = {
  globDirectory: 'public/',
  globPatterns: ['**/*.{html,js,css,json,png}'], // Certifique-se de incluir HTML
  swDest: 'public/sw.js',
  cacheName: 'aguasanta', // Adicionei um nome de cache
  cacheOptions: {
    cacheableResponse: {
      statuses: [0, 200], // Ajuste as opções de cache
    },
  },
};
