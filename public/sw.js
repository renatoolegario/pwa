// sw.js
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('nome-do-cache').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.js',
          '/index.html',
          '/styles.css',
          // Adicione os caminhos para os arquivos que você deseja que sejam cacheados
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  