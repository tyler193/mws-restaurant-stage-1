let cacheVersion = '01';

const filesCached = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

//Install files into cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheVersion).then(function(cache) {
      return cache.addAll(filesCached);
    })
  );
});


//Check to make sure worker is activated
self.addEventListener('activate', function(event) {
  console.log('service worker activated');
  event.waitUntil(
    caches.keys().then(function(cacheVersion) {
      return Promise.all(
        cacheVersion.map(function(cache) {
          if (cache !== cacheVersion) {
            console.log('clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Fetch event to see cached files offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request)
        .then(function(response) {
          let clone = response.clone();
          caches.open(cacheVersion).then(function(cache) {
            cache.put(event.request, clone);
          })
          return response;
        })
        .catch(function(err) {
          console.log(err);
        });
      }
    })
  );
});
