console.log("I am a service worker");
const url = ['/', 'app.js', 'styles.css',
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];

// Prefetching the assets
globalThis.addEventListener('install' , event => {
    caches.open('pwa').then(cache => {
        cache.addAll(url)
    })
})

// Network first strategy
self.addEventListener('fetch', event => {
    event.respondWith(
      fetch(event.request) // I go to the network ALWAYS
        .catch( error => {  // if the network is down, I go to the cache
            return caches.open("assets")
                    .then( cache => {
                         return cache.match(request);
                 });
        })
    );
  });