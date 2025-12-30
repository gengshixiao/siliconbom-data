// 工作台逻辑

document.addEventListener('DOMContentLoaded', () => {
  // 初始化数据
  initDashboardData();
  
  // 初始化时间选择器
  initTimeSelector();
});

// 初始化工作台数据
function initDashboardData() {
  // 数据已经在HTML中，这里可以添加动态更新逻辑
  updateTimeDisplay();
}

// 初始化时间选择器
function initTimeSelector() {
  const timeRangeSelect = document.getElementById('timeRange');
  const groupSelect = document.getElementById('groupBy');
  
  if (timeRangeSelect) {
    timeRangeSelect.addEventListener('change', () => {
      // 可以在这里更新图表数据
      updateTimeDisplay();
    });
  }
  
  if (groupSelect) {
    groupSelect.addEventListener('change', () => {
      // 可以在这里更新图表数据
    });
  }
}

// 更新时间显示
function updateTimeDisplay() {
  const timeDisplay = document.getElementById('updateTime');
  if (timeDisplay) {
    const now = new Date();
    const timeStr = formatDateTime(now);
    timeDisplay.textContent = `更新时间：${timeStr}`;
  }
}

