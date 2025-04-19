/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        '应用已通过Service Worker提供缓存。\n' +
        '欲获得更好的体验，请更新您的应用。'
      )
    },
    registered () {
      console.log('Service Worker 已注册。')
    },
    cached () {
      console.log('内容已缓存供离线使用。')
    },
    updatefound () {
      console.log('下载新内容中。')
    },
    updated () {
      console.log('有新内容可用，请刷新。')
      // 可以在这里添加通知，提示用户刷新页面
      alert('新版本可用！请刷新页面以获得最新内容。')
    },
    offline () {
      console.log('未找到网络连接。应用正在离线模式下运行。')
    },
    error (error) {
      console.error('Service Worker 注册错误:', error)
    }
  })
} 