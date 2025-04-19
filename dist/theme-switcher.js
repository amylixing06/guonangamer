// 主题切换功能
(function() {
  // 检查本地存储中是否有保存的主题
  function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.body.classList.add('dark-theme');
    }
  }

  // 在DOM加载完成后初始化主题
  window.addEventListener('DOMContentLoaded', function() {
    // 检查并应用保存的主题
    checkTheme();
    
    // 创建主题切换按钮
    const switchBtn = document.createElement('button');
    switchBtn.className = 'theme-switch';
    switchBtn.innerHTML = '🌓';
    switchBtn.setAttribute('aria-label', '切换主题');
    switchBtn.setAttribute('title', '切换主题');
    document.body.appendChild(switchBtn);
    
    // 添加主题切换点击事件
    switchBtn.addEventListener('click', function() {
      if (document.documentElement.classList.contains('dark-theme')) {
        // 切换到亮色主题
        document.documentElement.classList.remove('dark-theme');
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      } else {
        // 切换到暗色主题
        document.documentElement.classList.add('dark-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      }
    });
  });
})(); 