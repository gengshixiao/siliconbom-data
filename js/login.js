// 登录页面逻辑

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const errorMsg = document.getElementById('errorMsg');
  
  // 固定账号密码
  const FIXED_USERNAME = 'admin';
  const FIXED_PASSWORD = 'admin123';
  
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // 清除错误信息
    errorMsg.textContent = '';
    
    // 验证
    if (!username || !password) {
      errorMsg.textContent = '请输入用户名和密码';
      return;
    }
    
    // 检查账号密码
    if (username === FIXED_USERNAME && password === FIXED_PASSWORD) {
      // 保存登录状态
      storage.set('isLoggedIn', true);
      storage.set('username', username);
      
      // 跳转到工作台
      window.location.href = 'dashboard.html';
    } else {
      errorMsg.textContent = '用户名或密码错误';
      passwordInput.value = '';
    }
  });
  
  // 回车键提交
  usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      passwordInput.focus();
    }
  });
  
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      loginForm.dispatchEvent(new Event('submit'));
    }
  });
});

