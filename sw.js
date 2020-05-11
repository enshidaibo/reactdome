// importScripts('./static/js/workbox-sw.js');
importScripts('https://static.ws.126.net/163/frontend/libs/workbox/v3.1.0/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    workbox.googleAnalytics.initialize();
    workbox.skipWaiting();
    workbox.clientsClaim();
    workbox.core.setCacheNameDetails({
        prefix: 'myapp',
        suffix: 'v1',
        // precache: 'tianez-precache-name', // 不设置的话默认值为 'precache'
        // runtime: 'tianez-runtime-name' // 不设置的话默认值为 'runtime'
    });
    workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
    workbox.precaching.precacheAndRoute([
        // './bower.json',
        // './static/js/loadfile.min.js',
        {
            url: './js/react.16.8.4.js',
            revision: '16.8.4'
        },
        {
            url: './js/react-dom.16.8.4.js',
            revision: '16.8.4'
        },
        {
            url: './dll/vendor.dll.js',
            revision: '16.8.4'
        },
    ], {
        directoryIndex: null
    });
    workbox.routing.registerRoute(
        new RegExp('manifest.json'),
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        // '/text/',
        /\//,
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        // new RegExp('.*\.html'),
        /\.html$/,
        new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
        new RegExp('.*\.js$'),
        new workbox.strategies.CacheFirst()
    );
    workbox.routing.registerRoute(
        /\.css$/,
        new workbox.strategies.NetworkFirst({
            cacheName: 'css-cache',
        })
    );
    // workbox.routing.registerRoute(
    //     /\.css$/,
    //     new workbox.strategies.StaleWhileRevalidate({
    //         cacheName: 'css-cache',
    //     })
    // );
    workbox.routing.registerRoute(
        // Cache image files.
        /\.(?:png|jpg|jpeg|svg|gif)$/,
        // Use the cache if it's available.
        new workbox.strategies.CacheFirst({
            // Use a custom cache name.
            cacheName: 'image-cache',
            // plugins: [
            //     new workbox.expiration.Plugin({
            //         // Cache only 20 images.
            //         maxEntries: 20,
            //         // Cache for a maximum of a week.
            //         maxAgeSeconds: 7 * 24 * 60 * 60,
            //     })
            // ],
        })
    );
    // workbox.routing.registerRoute(
    //     new RegExp('.*\.json'),
    //     // workbox.strategies.StaleWhileRevalidate(),
    //     // workbox.strategies.NetworkFirst()
    //     workbox.strategies.cacheFirst()
    //     // workbox.strategies.networkFirst()
    // );
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}