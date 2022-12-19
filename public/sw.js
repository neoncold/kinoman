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
  `/images/bitmap.png`,
  `/images/bitmap@2x.png`,
  `/images/bitmap@3x.png`,
  `/images/emoji/angry.png`,
  `/images/emoji/puke.png`,
  `/images/emoji/sleeping.png`,
  `/images/emoji/smile.png`,
];

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(RESOURCES_TO_CACHE);
    })
  )
});

self.addEventListener(`activate`, (evt) => {
  caches.keys().then((keys) => {
    return Promise.all(keys.map((key) => {
      if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
        return caches.delete(key);
      }
      return null;
    })
    .filter((key) => key !== null));
  }).catch((err) => {
    throw new Error(err);
  })
});

self.addEventListener(`fetch`, (evt) => {
  const {request} = evt;
  
  evt.respondWith(
    caches.match(evt.request)
    .then((cacheRequest) => {
      if (cacheRequest) return cacheRequest;

      return fetch(request);
    })
    .then((response) => {
      if (!response || !response.ok || response.type !== `basic`) {
        return response;
      };

      const clonedResponse = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(evt.request, clonedResponse));

      return response;
    })
    .catch((err) => {
      console.log(new Error(err));
    })
  )
});