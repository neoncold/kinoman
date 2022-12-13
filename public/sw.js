const CACHE_PREFIX = `cinemaddict-cache`;
const CACHE_VER = `v1`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;
const RESOURCES_TO_CACHE = [
  `/`,
  `/index.html`,
  `/bundle.js`,
  `/css/main.css`,
  `/css/normalize.css`,
  `/images/background.png`,
];

const getFilteredKeysPromises = (keys) => {
  return keys.map((key) => {
    if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
      return caches.delete(key);
    }

    return null;
  })
    .filter((key) => key !== null);
};

self.addEventListener(`install`, (event) => {
  const openCache = caches.open(CACHE_NAME)
    .then((cache) => {
      // Add static resources to cache
      return cache.addAll(RESOURCES_TO_CACHE);
    })
    .catch((error) => {
      throw new Error(error);
    });

  event.waitUntil(openCache);
});

self.addEventListener(`activate`, (event) => {
  const cashedKeys = caches.keys()
    .then((keys) => {
      // Delete caches of older versions
      return Promise.all(getFilteredKeysPromises(keys));
    })
    .catch((error) => {
      throw new Error(error);
    });

  event.waitUntil(cashedKeys);
});

self.addEventListener(`fetch`, (event) => {
  const {request} = event;

  const resource = caches.match(request)
    .then((cacheResponse) => {
      if (cacheResponse) {
        return cacheResponse;
      }
      // If request was not cashed yet,
      // make fetch & save response to cache
      return fetch(request);
    })
    .then((response) => {
      if (!response || !response.ok || response.type !== `basic`) {
        return response;
      }

      // Clone response to save working method returning content
      const clonedResponse = response.clone();

      caches.open(CACHE_NAME)
        .then((cache) => {
          cache.put(request, clonedResponse)
        });

      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });

  event.respondWith(resource);
});