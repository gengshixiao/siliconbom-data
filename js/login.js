// 登录页面逻辑

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const tokenInput = document.getElementById('token');
  const getTokenBtn = document.getElementById('getTokenBtn');
  const errorMsg = document.getElementById('errorMsg');
  
  // 固定账号密码
  const FIXED_USERNAME = 'admin';
  const FIXED_PASSWORD = 'admin123';
  
  // 倒计时相关变量
  let countdownTimer = null;
  let countdownSeconds = 0;
  
  // 生成模拟验证码（6位数字）
  function generateToken() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  // 更新倒计时按钮文本
  function updateCountdownButton() {
    getTokenBtn.textContent = `${countdownSeconds}秒后重试`;
  }
  
  // 获取令牌功能
  function getToken() {
    if (countdownSeconds > 0) {
      return; // 倒计时中，不允许重复点击
    }
    
    // 生成并填充验证码
    const token = generateToken();
    tokenInput.value = token;
    
    // 开始倒计时
    countdownSeconds = 60;
    getTokenBtn.disabled = true;
    updateCountdownButton();
    
    countdownTimer = setInterval(() => {
      countdownSeconds--;
      updateCountdownButton();
      
      if (countdownSeconds <= 0) {
        clearInterval(countdownTimer);
        getTokenBtn.disabled = false;
        getTokenBtn.textContent = '获取令牌';
      }
    }, 1000);
  }
  
  // 页面加载时自动获取令牌
  getToken();
  
  // 点击按钮获取令牌
  getTokenBtn.addEventListener('click', getToken);
  
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const token = tokenInput.value.trim();
    
    // 清除错误信息
    errorMsg.textContent = '';
    
    // 验证
    if (!username || !password) {
      errorMsg.textContent = '请输入用户名和密码';
      return;
    }
    
    if (!token) {
      errorMsg.textContent = '请输入令牌';
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
      tokenInput.focus();
    }
  });
  
  tokenInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      loginForm.dispatchEvent(new Event('submit'));
    }
  });
});


