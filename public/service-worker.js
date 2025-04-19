const CACHE_NAME = 'guonan-simulator-v2';
const urlsToCache = [
  '/GuoNanSimulator/',
  '/GuoNanSimulator/index.html',
  '/GuoNanSimulator/offline.html',
  '/GuoNanSimulator/favicon.png',
  '/GuoNanSimulator/css/app.47094c85.css',
  '/GuoNanSimulator/css/chunk-vendors.a16c4353.css',
  '/GuoNanSimulator/js/app.e1175a50.js',
  '/GuoNanSimulator/js/chunk-vendors.68fe4d71.js',
  '/GuoNanSimulator/dark-theme.css',
  '/GuoNanSimulator/theme-switcher.js',
  'https://unpkg.com/98.css'
];

// 安装Service Worker并缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('已打开缓存');
        return cache.addAll(urlsToCache);
      })
  );
});

// 网络请求拦截
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果找到了缓存的响应，则返回缓存
        if (response) {
          return response;
        }
        
        // 克隆请求，因为请求只能使用一次
        const fetchRequest = event.request.clone();
        
        // 尝试从网络获取
        return fetch(fetchRequest)
          .then(response => {
            // 检查是否有效响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // 克隆响应，将其保存在缓存中
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(() => {
            // 网络请求失败时显示离线页面
            if (event.request.mode === 'navigate') {
              return caches.match('/GuoNanSimulator/offline.html');
            }
          });
      })
  );
});

// 激活Service Worker时清理旧缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 