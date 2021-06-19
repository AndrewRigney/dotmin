importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');

if (workbox) {
    // Cache the Google Fonts webfont files with a cache first strategy for 1 year.
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        new workbox.strategies.CacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                }),
            ],
        }),
    );

    // Cache app fonts
    workbox.routing.registerRoute(
        new RegExp('/fontawesome/.*\(?:eot|svg|ttf|woff)'),
        new workbox.strategies.CacheFirst({
            cacheName: 'app-fonts'
        }),
    );

    // Cache JS and CSS
    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        new workbox.strategies.StaleWhileRevalidate(),
    );

    // Cache images
    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        new workbox.strategies.CacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                }),
            ],
        }),
    );

    // Cache app views
    workbox.routing.registerRoute(
        new RegExp('/views/.*\(?:html|js|css)'),
        new workbox.strategies.CacheFirst({
            cacheName: 'app-views'
        }),
    );
} else {
    console.log("Workbox didn't load");
}
