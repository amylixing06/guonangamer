module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/GuoNanSimulator/' : '/',
  pwa: {
    name: '国男大冒险',
    themeColor: '#2a2a2a',
    msTileColor: '#2a2a2a',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      name: '国男大冒险',
      short_name: '国男大冒险',
      description: '一个基于真实事件改编的模拟器游戏',
      start_url: '/GuoNanSimulator/index.html',
      display: 'standalone',
      background_color: '#2a2a2a',
      theme_color: '#2a2a2a',
      icons: [
        {
          src: 'favicon.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'favicon.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/index.html',
      exclude: [/\.map$/, /_redirects/],
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://cdn\\.jsdelivr\\.net/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'cdn-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: new RegExp('^https://unpkg\\.com/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'unpkg-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
} 