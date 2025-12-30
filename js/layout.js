// 主布局逻辑

document.addEventListener('DOMContentLoaded', () => {
  // 检查登录状态
  if (!checkAuth()) {
    return;
  }
  
  // 初始化主题
  initTheme();
  
  // 初始化侧边栏
  initSidebar();
  
  // 初始化导航
  initNavigation();
  
  // 初始化用户信息
  initUserInfo();
  
  // 初始化退出登录
  initLogout();
});

// 初始化导航
function initNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
  
  // 设置当前激活的导航项
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// 初始化用户信息
function initUserInfo() {
  const username = storage.get('username') || 'admin';
  const userInfoEl = document.getElementById('userInfo');
  if (userInfoEl) {
    userInfoEl.textContent = username;
  }
}

// 初始化退出登录
function initLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      confirm('确定要退出登录吗？', () => {
        storage.remove('isLoggedIn');
        storage.remove('username');
        window.location.href = 'index.html';
      });
    });
  }
}

// 初始化侧边栏
function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  
  if (!sidebar || !sidebarToggle) return;
  
  // 从存储中读取侧边栏状态
  const isCollapsed = storage.get('sidebarCollapsed') || false;
  if (isCollapsed) {
    sidebar.classList.add('collapsed');
  }
  
  // 切换侧边栏
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    storage.set('sidebarCollapsed', sidebar.classList.contains('collapsed'));
  });
}

// 初始化主题
function initTheme() {
  const theme = storage.get('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    updateThemeToggleText(theme);
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      storage.set('theme', newTheme);
      updateThemeToggleText(newTheme);
    });
  }
}

// 更新主题切换按钮（使用CSS伪元素，无需更新文本）
function updateThemeToggleText(theme) {
  // 主题切换按钮使用CSS伪元素显示图标，无需更新文本
  // 图标通过CSS的::before伪元素控制
}

