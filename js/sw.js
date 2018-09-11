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


//Fetch event to see cached files offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        //console.log('found ', event.request, ' in cache');
        return response;
      }
      else {
        //console.log('could not find ', event.request, ' in cache');
        return fetch(event.request)
        .then(function(fetch_response) {
          const respClone = fetch_response.clone();
          caches.open(filesCached).then(function(cache) {
            cache.put(event.request, respClone);
          })
          return response;
        })
        .catch(function(err) {
          console.error(err);
        })
      }
    })
  );
});
