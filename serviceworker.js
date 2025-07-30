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

// Cache first strategy
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)  // searching in the cache
            .then( response => {
                if (response) {
                    // The request is in the cache 
                    return response; // cache hit
                } else {
                    // We need to go to the network  
                    return fetch(event.request);  // cache miss
                }
            })
    );
});