// 在生产环境中注册Service Worker
if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
  // 页面加载完成后注册Service Worker
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/GuoNanSimulator/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker 注册成功，范围：', registration.scope);
      })
      .catch(function(error) {
        console.log('Service Worker 注册失败：', error);
      });
  });
} 