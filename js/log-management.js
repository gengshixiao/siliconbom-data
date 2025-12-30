// 日志管理逻辑

// 模拟日志数据（第一页10条）
const mockLogs = [
  { id: 1, tableName: 'parts_catalog', time: '2025-01-15 18:30:25', sql: 'SELECT * FROM parts_catalog WHERE partNumber LIKE "%TI%" LIMIT 100', result: '成功返回 45 条数据', source: '查询测试' },
  { id: 2, tableName: 'bom_items', time: '2025-01-15 18:28:12', sql: 'SELECT manufacturer, COUNT(*) as count FROM bom_items GROUP BY manufacturer', result: '成功返回 128 条数据', source: '硅宝调用' },
  { id: 3, tableName: 'inventory_quotes', time: '2025-01-15 18:25:08', sql: 'SELECT * FROM inventory_quotes WHERE stock < 100 ORDER BY stock ASC', result: '成功返回 23 条数据', source: '硅宝调用' },
  { id: 4, tableName: 'param_index', time: '2025-01-15 18:22:45', sql: 'SELECT * FROM param_index WHERE voltage > 50', result: '空结果', source: '查询测试' },
  { id: 5, tableName: 'datasheet_meta', time: '2025-01-15 18:20:33', sql: 'SELECT * FROM datasheet_meta WHERE category = "MOSFET"', result: '成功返回 156 条数据', source: '硅宝调用' },
  { id: 6, tableName: 'parts_catalog', time: '2025-01-15 18:18:20', sql: 'UPDATE parts_catalog SET stock = 1000 WHERE id = 1', result: '失败：只读策略拦截', source: '查询测试' },
  { id: 7, tableName: 'component_specs', time: '2025-01-15 18:15:55', sql: 'SELECT * FROM component_specs WHERE manufacturer = "Texas Instruments" LIMIT 50', result: '成功返回 50 条数据', source: '硅宝调用' },
  { id: 8, tableName: 'package_info', time: '2025-01-15 18:12:40', sql: 'SELECT DISTINCT package FROM package_info', result: '成功返回 28 条数据', source: '查询测试' },
  { id: 9, tableName: 'supplier_data', time: '2025-01-15 18:10:15', sql: 'SELECT * FROM supplier_data WHERE price < 1.0', result: '空结果', source: '硅宝调用' },
  { id: 10, tableName: 'parts_catalog', time: '2025-01-15 18:08:02', sql: 'SELECT * FROM parts_catalog WHERE voltage BETWEEN 5 AND 12', result: '成功返回 89 条数据', source: '硅宝调用' },
];

let currentPage = 1;
let pageSize = 10;
let filters = {
  tableName: '',
  source: '',
  timeRange: ''
};

document.addEventListener('DOMContentLoaded', () => {
  initLogManagement();
});

function initLogManagement() {
  renderLogs();
  initFilters();
}

// 初始化筛选器
function initFilters() {
  const tableNameInput = document.getElementById('filterTableName');
  const sourceSelect = document.getElementById('filterSource');
  const timeRangeSelect = document.getElementById('filterTimeRange');
  
  if (tableNameInput) {
    tableNameInput.addEventListener('input', debounce(() => {
      filters.tableName = tableNameInput.value.trim();
      currentPage = 1;
      renderLogs();
    }, 300));
  }
  
  if (sourceSelect) {
    sourceSelect.addEventListener('change', () => {
      filters.source = sourceSelect.value;
      currentPage = 1;
      renderLogs();
    });
  }
  
  if (timeRangeSelect) {
    timeRangeSelect.addEventListener('change', () => {
      filters.timeRange = timeRangeSelect.value;
      currentPage = 1;
      renderLogs();
    });
  }
}

// 渲染日志列表
function renderLogs() {
  const logTableBody = document.getElementById('logTableBody');
  const pagination = document.getElementById('logPagination');
  
  if (!logTableBody || !pagination) return;
  
  // 过滤数据
  let filteredLogs = [...mockLogs];
  
  if (filters.tableName) {
    const keyword = filters.tableName.toLowerCase();
    filteredLogs = filteredLogs.filter(log => 
      log.tableName.toLowerCase().includes(keyword)
    );
  }
  
  if (filters.source) {
    filteredLogs = filteredLogs.filter(log => 
      log.source === filters.source
    );
  }
  
  if (filters.timeRange) {
    const now = new Date();
    const range = parseInt(filters.timeRange);
    const cutoff = new Date(now.getTime() - range * 24 * 60 * 60 * 1000);
    
    filteredLogs = filteredLogs.filter(log => {
      const logTime = new Date(log.time);
      return logTime >= cutoff;
    });
  }
  
  // 分页
  const total = filteredLogs.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageData = filteredLogs.slice(start, end);
  
  // 渲染表格
  if (pageData.length > 0) {
    logTableBody.innerHTML = pageData.map(log => {
      const resultStatus = getResultStatus(log.result);
      const sourceClass = log.source === '查询测试' ? 'query-test' : 'siliconbom';
      
      return `
        <tr>
          <td class="mono">${log.id}</td>
          <td>${log.tableName}</td>
          <td class="mono">${log.time}</td>
          <td class="sql" title="${log.sql}">${log.sql}</td>
          <td class="result">
            <span class="status-badge ${resultStatus}">${log.result}</span>
          </td>
          <td>
            <span class="source-badge ${sourceClass}">${log.source}</span>
          </td>
        </tr>
      `;
    }).join('');
  } else {
    logTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--muted);">暂无数据</td></tr>';
  }
  
  // 渲染分页
  pagination.innerHTML = `
    <div class="pagination-info">
      共 ${total} 条，第 ${currentPage} / ${totalPages} 页
    </div>
    <div class="pagination-controls">
      <button class="btn pagination-btn" onclick="changeLogPage(1)" ${currentPage === 1 ? 'disabled' : ''}>首页</button>
      <button class="btn pagination-btn" onclick="changeLogPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>上一页</button>
      <button class="btn pagination-btn" onclick="changeLogPage(${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
      <button class="btn pagination-btn" onclick="changeLogPage(${totalPages})" ${currentPage >= totalPages ? 'disabled' : ''}>末页</button>
    </div>
  `;
}

// 获取结果状态
function getResultStatus(result) {
  if (result.includes('成功')) {
    return 'success';
  } else if (result.includes('空结果')) {
    return 'empty';
  } else if (result.includes('失败')) {
    return 'failed';
  }
  return 'success';
}

// 切换页码（全局函数，供HTML调用）
window.changeLogPage = function(page) {
  const total = mockLogs.length;
  const totalPages = Math.ceil(total / pageSize);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderLogs();
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// 重置筛选（全局函数，供HTML调用）
window.resetFilters = function() {
  filters = {
    tableName: '',
    source: '',
    timeRange: ''
  };
  
  const tableNameInput = document.getElementById('filterTableName');
  const sourceSelect = document.getElementById('filterSource');
  const timeRangeSelect = document.getElementById('filterTimeRange');
  
  if (tableNameInput) tableNameInput.value = '';
  if (sourceSelect) sourceSelect.value = '';
  if (timeRangeSelect) timeRangeSelect.value = '';
  
  currentPage = 1;
  renderLogs();
};

