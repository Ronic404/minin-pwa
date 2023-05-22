const staticCacheName = 's-app-v2'
const dynamicCacheName = 'd-app-v2'

const assetUrls = [
  '/index.html',
  '/offline.html',
  '/push.js',
  '/js/app.js',
  '/js/appInstallation.js',
  '/js/showNotifications.js',
  '/css/styles.css',
]

self.addEventListener('install', async () => {
  console.log('sw install')

  const cache = await caches.open(staticCacheName)
  await cache.addAll(assetUrls)
})

self.addEventListener('activate', async event => {
  const cacheKeys = await caches.keys()

  await Promise.all(
    cacheKeys
      .filter(key => ![staticCacheName, dynamicCacheName].includes(key))
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(networkFirst(request))
  }
})

self.addEventListener('push', event => {
  let options = {
    body: 'This notification was generated from a push!',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2',
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore this new world',
      },
      {
        action: 'close',
        title: 'Close',
      },
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Hello world', options)
  )
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? await fetch(request)
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName)

  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (error) {
    const cached = await caches.match(request)
    return cached ?? await caches.match('/offline.html')
  }
}
