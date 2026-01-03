// 通用工具函数

// 存储管理
const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage set error:', e);
    }
  },
  get: (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Storage remove error:', e);
    }
  }
};

// 检查登录状态
const checkAuth = () => {
  const isLoggedIn = storage.get('isLoggedIn');
  if (!isLoggedIn && !window.location.pathname.includes('index.html')) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
};

// 格式化日期时间
const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 格式化日期
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 格式化数字
const formatNumber = (num) => {
  if (num === null || num === undefined) return '';
  if (typeof num === 'string') return num;
  return num.toLocaleString('zh-CN');
};

// 防抖函数
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// 显示提示消息
const showMessage = (message, type = 'info') => {
  const messageEl = document.createElement('div');
  messageEl.className = `message message-${type}`;
  messageEl.textContent = message;
  messageEl.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 16px;
    background: var(--panel);
    border: 1px solid var(--stroke);
    border-radius: 6px;
    color: var(--text);
    font-size: 12px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(messageEl);
  
  setTimeout(() => {
    messageEl.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(messageEl);
    }, 300);
  }, 3000);
};

// 添加动画样式
if (!document.getElementById('message-styles')) {
  const style = document.createElement('style');
  style.id = 'message-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// 确认对话框
const confirm = (message, callback) => {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  const dialog = document.createElement('div');
  dialog.style.cssText = `
    background: var(--panel);
    border: 1px solid var(--stroke);
    border-radius: var(--r2);
    padding: 20px;
    min-width: 300px;
    max-width: 500px;
  `;
  
  dialog.innerHTML = `
    <div style="margin-bottom: 16px; color: var(--text); font-size: 14px;">${message}</div>
    <div style="display: flex; gap: 10px; justify-content: flex-end;">
      <button class="btn" data-action="cancel">取消</button>
      <button class="btn btn-primary" data-action="confirm">确认</button>
    </div>
  `;
  
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
  
  dialog.querySelector('[data-action="cancel"]').addEventListener('click', () => {
    document.body.removeChild(overlay);
  });
  
  dialog.querySelector('[data-action="confirm"]').addEventListener('click', () => {
    document.body.removeChild(overlay);
    if (callback) callback();
  });
};

