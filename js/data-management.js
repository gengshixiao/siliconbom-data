// 数据管理逻辑

// 模拟数据表列表
const mockTables = [
  { id: 1, alias: '总表', name: 'all_parts', rows: 267589948, updateTime: '2025-01-15 18:30:00' },
  { id: 2, alias: 'MOSFET', name: 'mosfet_parts', rows: 98420110, updateTime: '2025-01-15 18:30:00' },
  { id: 3, alias: '三极管', name: 'transistor_parts', rows: 64118902, updateTime: '2025-01-15 17:45:00' },
  { id: 4, alias: '电阻', name: 'resistor_parts', rows: 41006700, updateTime: '2025-01-15 16:20:00' },
  { id: 5, alias: '电容', name: 'capacitor_parts', rows: 29880114, updateTime: '2025-01-15 15:10:00' },
  { id: 6, alias: '电感', name: 'inductor_parts', rows: 18204982, updateTime: '2025-01-15 14:30:00' },
  { id: 7, alias: '二极管', name: 'diode_parts', rows: 15234056, updateTime: '2025-01-15 13:15:00' },
  { id: 8, alias: 'IC芯片', name: 'ic_chip_parts', rows: 12890123, updateTime: '2025-01-15 12:00:00' },
  { id: 9, alias: '连接器', name: 'connector_parts', rows: 9876543, updateTime: '2025-01-15 11:20:00' },
];

// 模拟表明细数据（第一页10条）
const mockTableData = {
  all_parts: [
    { id: 101, partNumber: 'TI-74HC00D', manufacturer: 'Texas Instruments', category: 'MOSFET', voltage: '5V', current: '8mA', package: 'SOIC-14', stock: 1250, price: 0.25, inputMethod: 'manual', datasheetUrl: 'https://www.ti.com/lit/ds/symlink/74hc00.pdf', updateTime: '2025-01-15 18:30:00' },
    { id: 102, partNumber: 'BC547B', manufacturer: 'Fairchild', category: '三极管', voltage: '45V', current: '100mA', package: 'TO-92', stock: 5200, price: 0.08, inputMethod: 'datasheet', datasheetUrl: 'https://www.fairchild.com/datasheet/BC547.pdf', updateTime: '2025-01-15 17:45:00' },
    { id: 103, partNumber: 'RES-10K-0603', manufacturer: 'Yageo', category: '电阻', voltage: '0.25W', current: '0.1A', package: '0603', stock: 15000, price: 0.01, inputMethod: 'import', datasheetUrl: '', updateTime: '2025-01-15 16:20:00' },
    { id: 104, partNumber: 'CAP-100UF-0805', manufacturer: 'Murata', category: '电容', voltage: '16V', current: '100uF', package: '0805', stock: 8800, price: 0.05, inputMethod: 'manual', datasheetUrl: 'https://www.murata.com/datasheet/CAP100UF.pdf', updateTime: '2025-01-15 15:10:00' },
    { id: 105, partNumber: 'IND-47UH-1206', manufacturer: 'TDK', category: '电感', voltage: '1A', current: '47uH', package: '1206', stock: 3200, price: 0.15, inputMethod: 'datasheet', datasheetUrl: 'https://www.tdk.com/datasheet/IND47UH.pdf', updateTime: '2025-01-15 14:30:00' },
    { id: 106, partNumber: '1N4007', manufacturer: 'ON Semiconductor', category: '二极管', voltage: '1000V', current: '1A', package: 'DO-41', stock: 12000, price: 0.03, inputMethod: 'import', datasheetUrl: 'https://www.onsemi.com/datasheet/1N4007.pdf', updateTime: '2025-01-15 13:15:00' },
    { id: 107, partNumber: 'STM32F103C8T6', manufacturer: 'STMicroelectronics', category: 'IC芯片', voltage: '3.3V', current: '72MHz', package: 'LQFP-48', stock: 850, price: 3.50, inputMethod: 'datasheet', datasheetUrl: 'https://www.st.com/datasheet/STM32F103C8T6.pdf', updateTime: '2025-01-15 12:00:00' },
    { id: 108, partNumber: 'CONN-USB-A-F', manufacturer: 'Amphenol', category: '连接器', voltage: '5V', current: '2A', package: 'USB-A', stock: 5600, price: 0.45, inputMethod: 'manual', datasheetUrl: 'https://www.amphenol.com/datasheet/USB-A.pdf', updateTime: '2025-01-15 11:20:00' },
    { id: 109, partNumber: 'ST-MOSFET-2N7000', manufacturer: 'STMicroelectronics', category: 'MOSFET', voltage: '60V', current: '200mA', package: 'TO-92', stock: 3200, price: 0.15, inputMethod: 'datasheet', datasheetUrl: 'https://www.st.com/resource/en/datasheet/2n7000.pdf', updateTime: '2025-01-15 17:45:00' },
    { id: 110, partNumber: 'LM7805', manufacturer: 'Texas Instruments', category: 'IC芯片', voltage: '5V', current: '1A', package: 'TO-220', stock: 2400, price: 0.35, inputMethod: 'manual', datasheetUrl: 'https://www.ti.com/lit/ds/symlink/lm7805.pdf', updateTime: '2025-01-15 10:45:00' },
  ],
  mosfet_parts: [
    { id: 1, partNumber: 'TI-74HC00D', manufacturer: 'Texas Instruments', category: 'MOSFET', voltage: '5V', current: '8mA', package: 'SOIC-14', stock: 1250, price: 0.25, inputMethod: 'manual', datasheetUrl: 'https://www.ti.com/lit/ds/symlink/74hc00.pdf', updateTime: '2025-01-15 18:30:00' },
    { id: 2, partNumber: 'ST-MOSFET-2N7000', manufacturer: 'STMicroelectronics', category: 'MOSFET', voltage: '60V', current: '200mA', package: 'TO-92', stock: 3200, price: 0.15, inputMethod: 'datasheet', datasheetUrl: 'https://www.st.com/resource/en/datasheet/2n7000.pdf', updateTime: '2025-01-15 17:45:00' },
    { id: 3, partNumber: 'INF-IPB60N06S4', manufacturer: 'Infineon', category: 'MOSFET', voltage: '60V', current: '50A', package: 'TO-263', stock: 850, price: 1.25, inputMethod: 'import', datasheetUrl: '', updateTime: '2025-01-15 16:20:00' },
    { id: 4, partNumber: 'NXP-BSS138', manufacturer: 'NXP Semiconductors', category: 'MOSFET', voltage: '50V', current: '200mA', package: 'SOT-23', stock: 5600, price: 0.12, inputMethod: 'manual', datasheetUrl: 'https://www.nxp.com/docs/en/data-sheet/BSS138.pdf', updateTime: '2025-01-15 15:10:00' },
    { id: 5, partNumber: 'ON-FDMS86101', manufacturer: 'ON Semiconductor', category: 'MOSFET', voltage: '30V', current: '30A', package: 'Power33', stock: 420, price: 0.85, inputMethod: 'datasheet', datasheetUrl: '', updateTime: '2025-01-15 14:30:00' },
    { id: 6, partNumber: 'VISHAY-SI2302', manufacturer: 'Vishay', category: 'MOSFET', voltage: '20V', current: '4.2A', package: 'SOT-23', stock: 2100, price: 0.18, inputMethod: 'import', datasheetUrl: 'https://www.vishay.com/docs/70660/70660.pdf', updateTime: '2025-01-15 13:15:00' },
    { id: 7, partNumber: 'FAIRCHILD-2N7002', manufacturer: 'Fairchild', category: 'MOSFET', voltage: '60V', current: '115mA', package: 'SOT-23', stock: 3800, price: 0.10, inputMethod: 'manual', datasheetUrl: '', updateTime: '2025-01-15 12:00:00' },
    { id: 8, partNumber: 'ROHM-2SK3019', manufacturer: 'ROHM', category: 'MOSFET', voltage: '60V', current: '5A', package: 'TO-220', stock: 650, price: 0.55, inputMethod: 'datasheet', datasheetUrl: 'https://www.rohm.com/datasheet/2SK3019', updateTime: '2025-01-15 11:20:00' },
    { id: 9, partNumber: 'TOSHIBA-2SK2231', manufacturer: 'Toshiba', category: 'MOSFET', voltage: '200V', current: '6A', package: 'TO-220', stock: 320, price: 1.15, inputMethod: 'import', datasheetUrl: '', updateTime: '2025-01-15 10:45:00' },
    { id: 10, partNumber: 'DIODES-DMN2041L', manufacturer: 'Diodes Inc', category: 'MOSFET', voltage: '20V', current: '4.5A', package: 'SOT-23', stock: 1800, price: 0.22, inputMethod: 'manual', datasheetUrl: 'https://www.diodes.com/assets/Datasheets/DMN2041L.pdf', updateTime: '2025-01-15 09:30:00' },
  ]
};

// 当前页面状态
let currentView = 'catalog'; // 'catalog' 或 'detail'
let currentTable = null;
let currentPage = 1;
let pageSize = 10;
let catalogSearchKeyword = ''; // 目录页搜索关键词
let searchFilters = {
  partNumber: '',
  manufacturer: '',
  voltage: '',
  current: '',
  inputMethod: ''
};

// Datasheet解析任务状态管理
let datasheetTasks = []; // 任务列表
let taskIdCounter = 1; // 任务ID计数器

// 预置的Datasheet文件列表（用于初始化已上传文件）
const presetDatasheetFiles = [
  { name: 'TI-MOSFET-2N7000.pdf', size: 245000 },
  { name: 'ST-Transistor-BC547B.pdf', size: 189000 },
  { name: 'ON-Diode-1N4007.pdf', size: 156000 },
  { name: 'Murata-Capacitor-100UF.pdf', size: 320000 },
  { name: 'Yageo-Resistor-10K.pdf', size: 128000 },
  { name: 'TDK-Inductor-47UH.pdf', size: 278000 },
  { name: 'STM32F103C8T6-Datasheet.pdf', size: 1250000 },
  { name: 'LM7805-Voltage-Regulator.pdf', size: 420000 },
  { name: 'USB-Connector-Amphenol.pdf', size: 198000 },
  { name: 'Infineon-MOSFET-IPB60N06.pdf', size: 356000 }
];

// Datasheet解析弹窗中的已上传文件列表
let uploadedDatasheetFiles = [];

document.addEventListener('DOMContentLoaded', () => {
  initDataManagement();
});

function initDataManagement() {
  // 检查URL参数，判断是目录页还是明细页
  const urlParams = new URLSearchParams(window.location.search);
  const tableId = urlParams.get('table');
  
  if (tableId) {
    // 显示表明细页
    const table = mockTables.find(t => t.id === parseInt(tableId));
    if (table) {
      showTableDetail(table);
    } else {
      showTableCatalog();
    }
  } else {
    // 显示目录页
    showTableCatalog();
  }
}

// 显示表目录
function showTableCatalog() {
  currentView = 'catalog';
  const container = document.getElementById('dataManagementContent');
  if (!container) return;
  
  container.innerHTML = `
    <div class="data-management-wrap">
      <div class="catalog-header">
        <h1 style="font-size: 20px; font-weight: 700; margin-bottom: 20px;">数据管理</h1>
        <input type="text" class="input catalog-search-input" id="catalogSearchInput" placeholder="搜索表名（中文/英文）" value="${catalogSearchKeyword}">
      </div>
      <div class="table-catalog" id="tableCatalog"></div>
    </div>
  `;
  
  // 初始化搜索框事件（回车搜索）
  const searchInput = document.getElementById('catalogSearchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        catalogSearchKeyword = e.target.value;
        renderTableCatalog();
      }
    });
  }
  
  renderTableCatalog();
}

// 渲染表目录
function renderTableCatalog() {
  const catalog = document.getElementById('tableCatalog');
  if (!catalog) return;
  
  // 根据搜索关键词过滤表
  let filteredTables = mockTables;
  if (catalogSearchKeyword.trim()) {
    const keyword = catalogSearchKeyword.trim().toLowerCase();
    filteredTables = mockTables.filter(table => 
      table.name.toLowerCase().includes(keyword) || 
      table.alias.toLowerCase().includes(keyword)
    );
  }
  
  catalog.innerHTML = filteredTables.map(table => `
    <div class="table-card" onclick="openTableDetail(${table.id})">
      <div class="table-card-header">
        <div class="table-card-title">${table.name}</div>
      </div>
      <div class="table-card-alias">${table.alias}</div>
      <div class="table-card-info">
        <div class="table-card-info-item">
          <span>数据行数</span>
          <span class="table-card-info-value mono">${formatNumber(table.rows)}</span>
        </div>
        <div class="table-card-info-item">
          <span>最近更新</span>
          <span class="table-card-info-value">${formatDateTime(table.updateTime)}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// 处理目录页搜索（全局函数，供HTML调用）
window.handleCatalogSearch = function() {
  const searchInput = document.getElementById('catalogSearchInput');
  if (searchInput) {
    catalogSearchKeyword = searchInput.value;
    renderTableCatalog();
  }
};

// 打开表明细页（全局函数，供HTML调用）
window.openTableDetail = function(tableId) {
  const table = mockTables.find(t => t.id === tableId);
  if (table) {
    window.location.href = `data-management.html?table=${tableId}`;
  }
};

// 显示表明细页
function showTableDetail(table) {
  currentView = 'detail';
  currentTable = table;
  
  const container = document.getElementById('dataManagementContent');
  if (!container) return;
  
  container.innerHTML = `
    <div class="data-management-wrap">
      <div class="table-detail-header">
        <div>
          <button class="btn" onclick="goBackToCatalog()" style="margin-bottom: 8px;">← 返回</button>
          <div class="table-detail-title">${table.alias} (${table.name})</div>
        </div>
        <div class="table-detail-actions">
          ${table.name !== 'all_parts' ? `
          <div class="task-notification-dropdown" id="taskNotificationDropdown">
            <button class="btn task-notification-btn" id="taskNotificationBtn" onclick="toggleTaskNotificationMenu(event)" title="解析任务">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span class="task-notification-badge" id="taskNotificationBadge" style="display: none;">0</span>
            </button>
            <div class="task-notification-menu" id="taskNotificationMenu">
              <div class="task-notification-header">解析任务</div>
              <div class="task-notification-list" id="taskNotificationList">
                <div class="task-notification-empty">暂无任务</div>
              </div>
            </div>
          </div>
          <div class="action-dropdown">
            <button class="btn btn-primary action-dropdown-btn" id="addDataBtn" onclick="toggleAddDataMenu(event)">录入数据</button>
            <div class="action-dropdown-menu" id="addDataMenu">
              <button class="action-dropdown-item" onclick="openAddModal('manual')">手动录入</button>
              <button class="action-dropdown-item" onclick="openAddModal('import')">批量导入</button>
              <button class="action-dropdown-item" onclick="openAddModal('datasheet')">Datasheet解析</button>
            </div>
          </div>
          ` : ''}
          <button class="btn" onclick="openQueryTest()">查询测试</button>
        </div>
      </div>
      
      <div class="search-bar">
        <div class="search-fields">
          <div class="search-field">
            <label class="search-label">物料编码</label>
            <input type="text" class="input search-input" id="searchPartNumber" placeholder="请输入物料编码">
          </div>
          <div class="search-field">
            <label class="search-label">制造商</label>
            <input type="text" class="input search-input" id="searchManufacturer" placeholder="请输入制造商">
          </div>
          <div class="search-field">
            <label class="search-label">电压</label>
            <input type="text" class="input search-input" id="searchVoltage" placeholder="请输入电压">
          </div>
          <div class="search-field">
            <label class="search-label">电流</label>
            <input type="text" class="input search-input" id="searchCurrent" placeholder="请输入电流">
          </div>
          <div class="search-field">
            <label class="search-label">录入方式</label>
            <select class="input search-select" id="searchInputMethod">
              <option value="">全部</option>
              <option value="manual">手动录入</option>
              <option value="datasheet">Datasheet解析</option>
              <option value="import">批量导入</option>
            </select>
          </div>
        </div>
        <div class="search-actions">
          <button class="btn" onclick="resetSearch()">重置</button>
          <button class="btn btn-primary" onclick="handleSearch()">搜索</button>
        </div>
      </div>
      
      <div class="data-table-container">
        <div class="data-table-wrapper">
          <table class="data-table" id="dataTable">
            <thead id="tableHead"></thead>
            <tbody id="tableBody"></tbody>
          </table>
        </div>
      </div>
      
      <div class="pagination" id="pagination"></div>
    </div>
  `;
  
  // 初始化事件
  initTableDetailEvents();
  
  // 渲染表格数据
  renderTableData();
}

// 初始化表明细页事件
function initTableDetailEvents() {
  // 搜索输入框回车
  const searchInputs = document.querySelectorAll('.search-input, .search-select');
  searchInputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  });
  
  // 点击外部关闭下拉框
  document.addEventListener('click', (e) => {
    const dropdown = document.querySelector('.action-dropdown');
    const menu = document.getElementById('addDataMenu');
    if (dropdown && menu && !dropdown.contains(e.target)) {
      menu.classList.remove('show');
    }
    
    // 点击外部关闭任务通知菜单
    const taskDropdown = document.querySelector('.task-notification-dropdown');
    const taskMenu = document.getElementById('taskNotificationMenu');
    if (taskDropdown && taskMenu && !taskDropdown.contains(e.target)) {
      taskMenu.classList.remove('show');
    }
  });
  
  // 初始化任务通知按钮和列表
  updateTaskNotificationButton();
  renderTaskNotificationList();
}

// 渲染表格数据
function renderTableData() {
  const tableHead = document.getElementById('tableHead');
  const tableBody = document.getElementById('tableBody');
  const pagination = document.getElementById('pagination');
  
  if (!tableHead || !tableBody || !pagination) return;
  
  // 获取当前表的数据
  const allData = mockTableData[currentTable.name] || [];
  
  // 搜索过滤
  let filteredData = allData;
  
  // 应用各个搜索条件
  if (searchFilters.partNumber) {
    const keyword = searchFilters.partNumber.toLowerCase();
    filteredData = filteredData.filter(row => 
      String(row.partNumber || '').toLowerCase().includes(keyword)
    );
  }
  
  if (searchFilters.manufacturer) {
    const keyword = searchFilters.manufacturer.toLowerCase();
    filteredData = filteredData.filter(row => 
      String(row.manufacturer || '').toLowerCase().includes(keyword)
    );
  }
  
  if (searchFilters.voltage) {
    const keyword = searchFilters.voltage.toLowerCase();
    filteredData = filteredData.filter(row => 
      String(row.voltage || '').toLowerCase().includes(keyword)
    );
  }
  
  if (searchFilters.current) {
    const keyword = searchFilters.current.toLowerCase();
    filteredData = filteredData.filter(row => 
      String(row.current || '').toLowerCase().includes(keyword)
    );
  }
  
  // 录入方式过滤
  if (searchFilters.inputMethod) {
    filteredData = filteredData.filter(row => 
      row.inputMethod === searchFilters.inputMethod
    );
  }
  
  // 分页
  const total = filteredData.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageData = filteredData.slice(start, end);
  
  // 渲染表头
  if (pageData.length > 0) {
    const columns = Object.keys(pageData[0]).filter(key => 
      key !== 'id' && key !== 'stock' && key !== 'price'
    );
    // 确保updateTime在最后（如果存在）
    const sortedColumns = [...columns.filter(col => col !== 'updateTime'), ...(columns.includes('updateTime') ? ['updateTime'] : [])];
    tableHead.innerHTML = `
      <tr>
        ${sortedColumns.map(col => `<th>${getColumnName(col)}</th>`).join('')}
        <th class="sticky-actions-header" style="width: 180px;">操作</th>
      </tr>
    `;
    
    // 渲染表体
    tableBody.innerHTML = pageData.map(row => `
      <tr>
        ${sortedColumns.map(col => `<td class="mono">${formatCellValue(row[col], col, row.id)}</td>`).join('')}
        <td class="sticky-actions-cell">
          <div class="data-table-actions">
            <button class="action-btn edit" onclick="editRow(${row.id})">编辑</button>
            <button class="action-btn delete" onclick="deleteRow(${row.id})">删除</button>
          </div>
        </td>
      </tr>
    `).join('');
  } else {
    tableHead.innerHTML = '<tr><th colspan="100%">暂无数据</th></tr>';
    tableBody.innerHTML = '';
  }
  
  // 渲染分页
  pagination.innerHTML = `
    <div class="pagination-info">
      <span class="pagination-total">共 ${formatNumber(total)} 条数据</span>
      <span class="pagination-page-info">第 ${currentPage} / ${totalPages} 页</span>
    </div>
    <div class="pagination-controls">
      <button class="btn pagination-btn" onclick="changePage(1)" ${currentPage === 1 ? 'disabled' : ''}>首页</button>
      <button class="btn pagination-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>上一页</button>
      <div class="pagination-jump">
        <span class="pagination-jump-label">跳转到</span>
        <input type="number" class="pagination-jump-input" id="pageJumpInput" min="1" max="${totalPages}" value="${currentPage}" onkeypress="handlePageJump(event)">
        <span class="pagination-jump-label">页</span>
        <button class="btn pagination-btn pagination-jump-btn" onclick="jumpToPage()">跳转</button>
      </div>
      <button class="btn pagination-btn" onclick="changePage(${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
      <button class="btn pagination-btn" onclick="changePage(${totalPages})" ${currentPage >= totalPages ? 'disabled' : ''}>末页</button>
    </div>
  `;
}

// 获取列名
function getColumnName(key) {
  const names = {
    partNumber: '物料编码',
    manufacturer: '制造商',
    category: '类别',
    voltage: '电压',
    current: '电流',
    package: '封装',
    stock: '库存',
    price: '价格',
    inputMethod: '录入方式',
    datasheetUrl: '数据手册',
    updateTime: '更新时间'
  };
  return names[key] || key;
}

// 获取录入方式显示文本
function getInputMethodText(value) {
  const methods = {
    manual: '手动录入',
    datasheet: 'Datasheet解析',
    import: '批量导入'
  };
  return methods[value] || value;
}

// 格式化日期时间（精确到分钟）
function formatDateTimeToMinute(dateTime) {
  if (!dateTime) return '-';
  try {
    const d = new Date(dateTime);
    if (isNaN(d.getTime())) {
      // 如果不是有效日期，尝试解析字符串格式 "YYYY-MM-DD HH:mm:ss"
      const parts = dateTime.split(' ');
      if (parts.length >= 2) {
        const datePart = parts[0];
        const timePart = parts[1];
        if (timePart) {
          const timeParts = timePart.split(':');
          if (timeParts.length >= 2) {
            return `${datePart} ${timeParts[0]}:${timeParts[1]}`;
          }
        }
      }
      return dateTime;
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  } catch (e) {
    return dateTime;
  }
}

// 格式化单元格值
function formatCellValue(value, key, rowId) {
  if (value === null || value === undefined || value === '') {
    return '-';
  }
  if (key === 'inputMethod') {
    return getInputMethodText(value);
  }
  if (key === 'updateTime') {
    return formatDateTimeToMinute(value);
  }
  if (key === 'datasheetUrl') {
    // 提取域名或简化显示
    let displayText = value;
    try {
      const url = new URL(value);
      displayText = url.hostname + (url.pathname.length > 20 ? url.pathname.substring(0, 20) + '...' : url.pathname);
    } catch (e) {
      // 如果不是有效URL，截断显示
      if (value.length > 40) {
        displayText = value.substring(0, 40) + '...';
      }
    }
    // SVG文档图标
    const datasheetIcon = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" style="display: inline-block; vertical-align: middle; margin-left: 4px; opacity: 0.6; flex-shrink: 0;"><path d="M2 1.5h5.5L10 4.5v6H2v-9z" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 1.5v3h3" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.5 6.5h5M3.5 8.5h5" stroke-linecap="round"/></svg>`;
    return `<a href="javascript:void(0)" class="datasheet-link-cell" style="color: var(--primary); text-decoration: none; cursor: pointer; border-bottom: 1px solid var(--primary); padding-bottom: 1px; display: inline-flex; align-items: center; gap: 4px;" onclick="openDatasheetFromLink(${rowId})" title="点击查看数据手册：${value}">${displayText}${datasheetIcon}</a>`;
  }
  if (typeof value === 'number') {
    if (value >= 1000) {
      return formatNumber(value);
    }
    return value;
  }
  return value;
}

// 返回目录（全局函数，供HTML调用）
window.goBackToCatalog = function() {
  window.location.href = 'data-management.html';
};

// 搜索（全局函数，供HTML调用）
window.handleSearch = function() {
  const partNumber = document.getElementById('searchPartNumber');
  const manufacturer = document.getElementById('searchManufacturer');
  const voltage = document.getElementById('searchVoltage');
  const current = document.getElementById('searchCurrent');
  const inputMethod = document.getElementById('searchInputMethod');
  
  if (partNumber) searchFilters.partNumber = partNumber.value.trim();
  if (manufacturer) searchFilters.manufacturer = manufacturer.value.trim();
  if (voltage) searchFilters.voltage = voltage.value.trim();
  if (current) searchFilters.current = current.value.trim();
  if (inputMethod) searchFilters.inputMethod = inputMethod.value;
  
  currentPage = 1;
  renderTableData();
};

// 重置搜索（全局函数，供HTML调用）
window.resetSearch = function() {
  searchFilters = {
    partNumber: '',
    manufacturer: '',
    voltage: '',
    current: '',
    inputMethod: ''
  };
  
  const partNumber = document.getElementById('searchPartNumber');
  const manufacturer = document.getElementById('searchManufacturer');
  const voltage = document.getElementById('searchVoltage');
  const current = document.getElementById('searchCurrent');
  const inputMethod = document.getElementById('searchInputMethod');
  
  if (partNumber) partNumber.value = '';
  if (manufacturer) manufacturer.value = '';
  if (voltage) voltage.value = '';
  if (current) current.value = '';
  if (inputMethod) inputMethod.value = '';
  
  currentPage = 1;
  renderTableData();
};

// 切换页码（全局函数，供HTML调用）
window.changePage = function(page) {
  const allData = mockTableData[currentTable.name] || [];
  
  // 应用搜索过滤
  let filteredData = allData;
  if (searchFilters.partNumber) {
    const keyword = searchFilters.partNumber.toLowerCase();
    filteredData = filteredData.filter(row => 
      String(row.partNumber || '').toLowerCase().includes(keyword)
    );
  }
  if (searchFilters.manufacturer) {
    const keyword = searchFilters.manufacturer.toLowerCase();
    filteredData = filteredData.filter(row => 
      String(row.manufacturer || '').toLowerCase().includes(keyword)
    );
  }
  if (searchFilters.voltage) {
    const keyword = searchFilters.voltage.toLowerCase();
    filteredData = filteredData.filter(row => 
      String(row.voltage || '').toLowerCase().includes(keyword)
    );
  }
  if (searchFilters.current) {
    const keyword = searchFilters.current.toLowerCase();
    filteredData = filteredData.filter(row => 
      String(row.current || '').toLowerCase().includes(keyword)
    );
  }
  if (searchFilters.inputMethod) {
    filteredData = filteredData.filter(row => 
      row.inputMethod === searchFilters.inputMethod
    );
  }
  
  const total = filteredData.length;
  const totalPages = Math.ceil(total / pageSize);
  
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderTableData();
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// 跳转到指定页码（全局函数，供HTML调用）
window.jumpToPage = function() {
  const pageInput = document.getElementById('pageJumpInput');
  if (pageInput) {
    const page = parseInt(pageInput.value);
    if (!isNaN(page) && page > 0) {
      changePage(page);
    }
  }
};

// 处理页码输入框回车（全局函数，供HTML调用）
window.handlePageJump = function(event) {
  if (event.key === 'Enter') {
    jumpToPage();
  }
};

// 编辑行（全局函数，供HTML调用）
window.editRow = function(id) {
  const allData = mockTableData[currentTable.name] || [];
  const row = allData.find(r => r.id === id);
  if (!row) return;
  
  openEditModal(row);
};

// 删除行（全局函数，供HTML调用）
window.deleteRow = function(id) {
  confirm('确定要删除这条数据吗？', () => {
    const allData = mockTableData[currentTable.name] || [];
    const index = allData.findIndex(r => r.id === id);
    if (index > -1) {
      allData.splice(index, 1);
      renderTableData();
      showMessage('删除成功', 'success');
    }
  });
};

// 切换录入数据下拉菜单（全局函数，供HTML调用）
window.toggleAddDataMenu = function(event) {
  event.stopPropagation();
  const menu = document.getElementById('addDataMenu');
  if (menu) {
    menu.classList.toggle('show');
  }
};

// 打开添加弹窗（全局函数，供HTML调用）
window.openAddModal = function(type) {
  // 关闭下拉菜单
  const menu = document.getElementById('addDataMenu');
  if (menu) {
    menu.classList.remove('show');
  }
  
  const modal = createModal(type === 'datasheet' ? 'Datasheet解析' : '录入数据', getAddFormHTML(type), () => {
    const form = document.getElementById('addForm');
    if (form) {
      // 如果是datasheet类型，初始化文件上传事件
      if (type === 'datasheet') {
        initDatasheetFileUpload();
      }
      
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleAddSubmit(type);
      });
    }
  });
  
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 10);
};

// 获取数据手册输入组件HTML
function getDatasheetInputHTML(value = '') {
  const hasValue = value && value.trim() !== '';
  const initialMode = hasValue ? 'url' : 'url'; // 默认URL模式
  return `
    <div class="form-group">
      <label class="form-label">数据手册</label>
      <div class="datasheet-input-wrapper">
        <div class="datasheet-mode-switch">
          <button type="button" class="datasheet-mode-btn ${initialMode === 'url' ? 'active' : ''}" data-mode="url" onclick="switchDatasheetMode('url')">URL输入</button>
          <button type="button" class="datasheet-mode-btn ${initialMode === 'file' ? 'active' : ''}" data-mode="file" onclick="switchDatasheetMode('file')">本地文件上传</button>
        </div>
        <div class="datasheet-input-content">
          <div class="datasheet-url-input" id="datasheetUrlInput" style="display: ${initialMode === 'url' ? 'block' : 'none'};">
            <input type="text" class="form-input" name="datasheetUrl" id="datasheetUrl" placeholder="请输入数据手册URL" value="${value || ''}">
          </div>
          <div class="datasheet-file-input" id="datasheetFileInput" style="display: ${initialMode === 'file' ? 'block' : 'none'};">
            <input type="file" class="form-input" name="datasheetFile" id="datasheetFile" accept=".pdf,.doc,.docx">
            <div class="datasheet-file-hint" style="font-size: 11px; color: var(--muted); margin-top: 4px;">
              支持 PDF、Word 格式，上传后将自动转换为URL
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 切换数据手册输入模式（全局函数）
window.switchDatasheetMode = function(mode) {
  const urlInput = document.getElementById('datasheetUrlInput');
  const fileInput = document.getElementById('datasheetFileInput');
  const modeButtons = document.querySelectorAll('.datasheet-mode-btn');
  
  if (urlInput && fileInput && modeButtons) {
    // 更新按钮状态
    modeButtons.forEach(btn => {
      if (btn.dataset.mode === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // 切换输入框显示
    if (mode === 'url') {
      urlInput.style.display = 'block';
      fileInput.style.display = 'none';
      // 清空文件输入
      const fileInputEl = document.getElementById('datasheetFile');
      if (fileInputEl) fileInputEl.value = '';
    } else {
      urlInput.style.display = 'none';
      fileInput.style.display = 'block';
    }
  }
};

// 获取添加表单HTML
function getAddFormHTML(type) {
  if (type === 'manual') {
    return `
      <form id="addForm">
        <div class="form-group">
          <label class="form-label">物料编码</label>
          <input type="text" class="form-input" name="partNumber" required>
        </div>
        <div class="form-group">
          <label class="form-label">制造商</label>
          <input type="text" class="form-input" name="manufacturer" required>
        </div>
        <div class="form-group">
          <label class="form-label">类别</label>
          <input type="text" class="form-input" name="category" required>
        </div>
        <div class="form-group">
          <label class="form-label">电压</label>
          <input type="text" class="form-input" name="voltage" required>
        </div>
        <div class="form-group">
          <label class="form-label">电流</label>
          <input type="text" class="form-input" name="current" required>
        </div>
        <div class="form-group">
          <label class="form-label">封装</label>
          <input type="text" class="form-input" name="package" required>
        </div>
        ${getDatasheetInputHTML()}
      </form>
    `;
  } else if (type === 'import') {
    return `
      <form id="addForm">
        <div class="form-group">
          <label class="form-label">选择文件</label>
          <input type="file" class="form-input" name="file" accept=".csv,.xlsx,.xls" required>
        </div>
        <div class="form-group">
          <label class="form-label">文件格式说明</label>
          <div style="font-size: 12px; color: var(--muted); padding: 8px; background: rgba(255,255,255,.02); border-radius: 4px; margin-bottom: 8px;">
            支持 CSV、Excel 格式，第一行为表头，包含：物料编码、制造商、类别、电压、电流、封装
          </div>
          <button type="button" class="btn" onclick="downloadImportTemplate()" style="width: 100%;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; margin-right: 6px;">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            下载导入模板
          </button>
        </div>
      </form>
    `;
  } else if (type === 'datasheet') {
    // 初始化已上传文件列表（如果为空，则使用预置文件）
    if (uploadedDatasheetFiles.length === 0) {
      uploadedDatasheetFiles = [...presetDatasheetFiles];
    }
    
    return `
      <form id="addForm">
        <div class="form-group">
          <label class="form-label">上传文件</label>
          <input type="file" class="form-input" id="datasheetFileUpload" accept=".pdf,.doc,.docx" multiple>
          <div class="form-hint" style="margin-top: 4px;">
            支持 PDF、Word 格式，可同时选择多个文件
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">已上传文件</label>
          <div class="uploaded-files-list" id="uploadedFilesList">
            ${uploadedDatasheetFiles.length > 0 ? uploadedDatasheetFiles.map((file, index) => `
              <div class="uploaded-file-item" data-index="${index}">
                <div class="uploaded-file-info">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" style="flex-shrink: 0; margin-right: 8px; opacity: 0.6;">
                    <path d="M2 1.5h5.5L10 4.5v6H2v-9z" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.5 1.5v3h3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span class="uploaded-file-name">${file.name}</span>
                  <span class="uploaded-file-size">${(file.size / 1024).toFixed(2)} KB</span>
                </div>
                <button type="button" class="uploaded-file-remove" onclick="removeUploadedFile(${index})" title="删除">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            `).join('') : '<div class="uploaded-files-empty">暂无文件</div>'}
          </div>
        </div>
        <div style="font-size: 12px; color: var(--muted); margin-top: 8px;">
          系统将自动解析Datasheet并提取关键参数信息
        </div>
      </form>
    `;
  }
  return '';
}

// 模拟文件上传（生成URL）
async function uploadDatasheetFile(file) {
  return new Promise((resolve) => {
    // 模拟上传延迟
    setTimeout(() => {
      // 生成模拟URL
      const fileName = file.name.replace(/\s+/g, '-');
      const timestamp = Date.now();
      const url = `https://datasheets.example.com/uploads/${timestamp}-${fileName}`;
      resolve(url);
    }, 500);
  });
}

// 获取数据手册URL（处理URL输入或文件上传）
async function getDatasheetUrl() {
  const fileInput = document.getElementById('datasheetFile');
  const urlInput = document.getElementById('datasheetUrl');
  const fileInputWrapper = document.getElementById('datasheetFileInput');
  
  // 检查当前模式
  if (fileInputWrapper && fileInputWrapper.style.display !== 'none' && fileInput && fileInput.files && fileInput.files.length > 0) {
    // 文件上传模式
    try {
      showMessage('正在上传文件...', 'info');
      const url = await uploadDatasheetFile(fileInput.files[0]);
      showMessage('文件上传成功', 'success');
      return url;
    } catch (error) {
      showMessage('文件上传失败', 'error');
      throw error;
    }
  } else if (urlInput) {
    // URL输入模式
    return urlInput.value.trim();
  }
  return '';
}

// 处理添加提交
async function handleAddSubmit(type) {
  if (type === 'manual') {
    const form = document.getElementById('addForm');
    const formData = new FormData(form);
    const now = new Date();
    const updateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:00`;
    
    try {
      const datasheetUrl = await getDatasheetUrl();
      
      const newRow = {
        id: Date.now(),
        partNumber: formData.get('partNumber'),
        manufacturer: formData.get('manufacturer'),
        category: formData.get('category'),
        voltage: formData.get('voltage'),
        current: formData.get('current'),
        package: formData.get('package'),
        stock: 0,
        price: 0,
        datasheetUrl: datasheetUrl,
        inputMethod: 'manual',
        updateTime: updateTime
      };
      
      const allData = mockTableData[currentTable.name] || [];
      allData.unshift(newRow);
      mockTableData[currentTable.name] = allData;
      
      closeModal();
      renderTableData();
      showMessage('添加成功', 'success');
    } catch (error) {
      // 上传失败，不关闭弹窗
      console.error('添加失败:', error);
    }
  } else if (type === 'datasheet') {
    // 检查是否有已上传的文件
    if (uploadedDatasheetFiles.length === 0) {
      showMessage('请至少上传一个文件', 'error');
      return;
    }
    
    // Datasheet解析处理 - 根据已上传文件创建任务，模拟不同状态
    const tasks = uploadedDatasheetFiles.map((file, index) => {
      let status = 'waiting';
      let errorReason = null;
      
      // 模拟不同状态：1个等待中，1个解析中（一直保持），3个成功，5个失败
      if (index === 0) {
        status = 'waiting';
      } else if (index === 1) {
        status = 'parsing'; // 这个会一直保持解析中
      } else if (index >= 2 && index <= 4) {
        status = 'success';
      } else {
        status = 'failed';
        // 随机分配失败原因
        const reasons = ['wrong_category', 'params_failed', 'network_error'];
        errorReason = reasons[Math.floor(Math.random() * reasons.length)];
      }
      
      return {
        id: taskIdCounter++,
        fileName: file.name,
        fileSize: file.size,
        status: status,
        errorReason: errorReason,
        createdAt: new Date().toISOString(),
        isPermanentParsing: index === 1 // 标记这个任务一直保持解析中
      };
    });
    
    // 将任务添加到任务列表（新任务添加到前面）
    tasks.reverse().forEach(task => {
      datasheetTasks.unshift(task);
    });
    
    // 清空已上传文件列表（为下次打开弹窗做准备）
    uploadedDatasheetFiles = [];
    
    // 关闭弹窗
    closeModal();
    
    // 更新消息按钮和任务列表
    updateTaskNotificationButton();
    renderTaskNotificationList();
    
    // 开始处理任务（模拟），除了已经成功和失败的任务
    startProcessingTasks();
  } else {
    closeModal();
    showMessage(`${type === 'import' ? '导入' : 'Datasheet解读'}功能演示中`, 'info');
  }
}

// 打开编辑弹窗
function openEditModal(row) {
  const modal = createModal('编辑数据', getEditFormHTML(row), () => {
    const form = document.getElementById('editForm');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleEditSubmit(row.id);
      });
    }
  });
  
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 10);
}

// 获取编辑表单HTML
function getEditFormHTML(row) {
  return `
    <form id="editForm">
      <div class="form-group">
        <label class="form-label">物料编码</label>
        <input type="text" class="form-input" name="partNumber" value="${row.partNumber}" required>
      </div>
      <div class="form-group">
        <label class="form-label">制造商</label>
        <input type="text" class="form-input" name="manufacturer" value="${row.manufacturer}" required>
      </div>
      <div class="form-group">
        <label class="form-label">类别</label>
        <input type="text" class="form-input" name="category" value="${row.category}" required>
      </div>
      <div class="form-group">
        <label class="form-label">电压</label>
        <input type="text" class="form-input" name="voltage" value="${row.voltage}" required>
      </div>
      <div class="form-group">
        <label class="form-label">电流</label>
        <input type="text" class="form-input" name="current" value="${row.current}" required>
      </div>
      <div class="form-group">
        <label class="form-label">封装</label>
        <input type="text" class="form-input" name="package" value="${row.package}" required>
      </div>
      ${getDatasheetInputHTML(row.datasheetUrl || '')}
    </form>
  `;
}

// 处理编辑提交
async function handleEditSubmit(id) {
  const form = document.getElementById('editForm');
  const formData = new FormData(form);
  
  const allData = mockTableData[currentTable.name] || [];
  const index = allData.findIndex(r => r.id === id);
  if (index > -1) {
    const now = new Date();
    const updateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:00`;
    
    try {
      const datasheetUrl = await getDatasheetUrl();
      
      allData[index] = {
        ...allData[index],
        partNumber: formData.get('partNumber'),
        manufacturer: formData.get('manufacturer'),
        category: formData.get('category'),
        voltage: formData.get('voltage'),
        current: formData.get('current'),
        package: formData.get('package'),
        datasheetUrl: datasheetUrl,
        updateTime: updateTime
      };
      
      closeModal();
      renderTableData();
      showMessage('编辑成功', 'success');
    } catch (error) {
      // 上传失败，不关闭弹窗
      console.error('编辑失败:', error);
    }
  }
}

// 从链接打开数据手册（全局函数，供HTML调用）
window.openDatasheetFromLink = function(id) {
  const allData = mockTableData[currentTable.name] || [];
  const row = allData.find(r => r.id === id);
  if (!row) return;
  
  // 如果没有数据手册URL，不打开
  if (!row.datasheetUrl) return;
  
  const drawer = createPDFDrawer(`${row.partNumber} - 数据手册`, row);
  
  // 初始化PDF浏览器功能
  setTimeout(() => {
    initPDFViewer(row);
  }, 50);
};

// 打开数据手册抽屉（全局函数，供HTML调用）
window.openDataManual = function(id) {
  const allData = mockTableData[currentTable.name] || [];
  const row = allData.find(r => r.id === id);
  if (!row) return;
  
  const drawer = createPDFDrawer(`${row.partNumber} - 数据手册`, row);
  
  // 初始化PDF浏览器功能
  setTimeout(() => {
    initPDFViewer(row);
  }, 50);
};

// 打开查询测试抽屉（全局函数，供HTML调用）
window.openQueryTest = function() {
  const drawer = createDrawer('查询测试', getQueryTestHTML());
  
  // 初始化对话功能
  setTimeout(() => {
    initChat();
    
    // 初始化清空对话按钮
    const clearBtn = document.getElementById('clearChatBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
          chatMessages.innerHTML = `
            <div class="chat-message assistant">
              您好，我是AI助手。您可以通过自然语言描述您的查询需求，我会为您生成相应的SQL查询语句。
            </div>
          `;
        }
      });
    }
  }, 50);
};

// 获取查询测试HTML
function getQueryTestHTML() {
  return `
    <div class="chat-messages" id="chatMessages">
      <div class="chat-message assistant">
        您好，我是AI助手。您可以通过自然语言描述您的查询需求，我会为您生成相应的SQL查询语句。
      </div>
    </div>
    <div class="chat-input-area">
      <input type="text" class="input chat-input" id="chatInput" placeholder="输入您的查询需求...">
      <button class="btn btn-primary" onclick="sendChatMessage()">发送</button>
    </div>
  `;
}

// 初始化对话
function initChat() {
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }
}

// 发送对话消息（全局函数，供HTML调用）
window.sendChatMessage = function() {
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  
  if (!chatInput || !chatMessages) return;
  
  const message = chatInput.value.trim();
  if (!message) return;
  
  // 添加用户消息
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message user';
  userMsg.textContent = message;
  chatMessages.appendChild(userMsg);
  
  chatInput.value = '';
  
  // 模拟AI回复
  setTimeout(() => {
    const assistantMsg = document.createElement('div');
    assistantMsg.className = 'chat-message assistant';
    assistantMsg.textContent = `已为您生成SQL查询：\n\nSELECT * FROM ${currentTable.name} WHERE ...\n\n（查询功能演示中）`;
    chatMessages.appendChild(assistantMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 500);
  
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

// 创建弹窗
function createModal(title, bodyHTML, onOpen) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">${title}</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="modal-body">${bodyHTML}</div>
      <div class="modal-footer">
        <button class="btn" onclick="closeModal()">取消</button>
        <button class="btn btn-primary" onclick="document.getElementById('${bodyHTML.includes('addForm') ? 'addForm' : 'editForm'}')?.dispatchEvent(new Event('submit'))">确认</button>
      </div>
    </div>
  `;
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  if (onOpen) {
    setTimeout(onOpen, 10);
  }
  
  return modal;
}

// 关闭弹窗（全局函数，供HTML调用）
window.closeModal = function() {
  const modal = document.querySelector('.modal.show');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }
};

// 创建抽屉
function createDrawer(title, bodyHTML) {
  // 创建遮罩层
  const overlay = document.createElement('div');
  overlay.className = 'drawer-overlay';
  overlay.addEventListener('click', closeDrawer);
  
  const drawer = document.createElement('div');
  drawer.className = 'drawer';
  drawer.innerHTML = `
    <div class="drawer-header">
      <div class="drawer-title">${title}</div>
      <div class="drawer-header-actions">
        <button class="drawer-action-btn" id="clearChatBtn" title="清空对话">⌫</button>
        <button class="drawer-close" onclick="closeDrawer()">×</button>
      </div>
    </div>
    <div class="drawer-body">${bodyHTML}</div>
  `;
  
  // 先添加遮罩，再添加抽屉
  document.body.appendChild(overlay);
  document.body.appendChild(drawer);
  
  setTimeout(() => {
    overlay.classList.add('show');
    drawer.classList.add('show');
  }, 10);
  
  return drawer;
}

// 关闭抽屉（全局函数，供HTML调用）
window.closeDrawer = function() {
  const drawer = document.querySelector('.drawer.show');
  const overlay = document.querySelector('.drawer-overlay.show');
  
  if (drawer) {
    drawer.classList.remove('show');
    setTimeout(() => {
      if (drawer.parentNode) {
        drawer.parentNode.removeChild(drawer);
      }
    }, 300);
  }
  
  if (overlay) {
    overlay.classList.remove('show');
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 300);
  }
};

// 创建PDF抽屉
function createPDFDrawer(title, row) {
  // 创建遮罩层
  const overlay = document.createElement('div');
  overlay.className = 'drawer-overlay';
  overlay.addEventListener('click', closeDrawer);
  
  const drawer = document.createElement('div');
  drawer.className = 'drawer pdf-drawer';
  drawer.innerHTML = `
    <div class="drawer-header">
      <div class="drawer-title">${title}</div>
      <div class="drawer-header-actions">
        <button class="drawer-action-btn" id="downloadPDFBtn" title="下载PDF">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </button>
        <button class="drawer-close" onclick="closeDrawer()">×</button>
      </div>
    </div>
    <div class="drawer-body pdf-viewer-container">
      <div class="pdf-viewer" id="pdfViewer">
        <div class="pdf-loading">加载中...</div>
      </div>
    </div>
  `;
  
  // 先添加遮罩，再添加抽屉
  document.body.appendChild(overlay);
  document.body.appendChild(drawer);
  
  setTimeout(() => {
    overlay.classList.add('show');
    drawer.classList.add('show');
  }, 10);
  
  return drawer;
}

// 初始化PDF浏览器
function initPDFViewer(row) {
  const pdfViewer = document.getElementById('pdfViewer');
  if (!pdfViewer) return;
  
  // 模拟加载
  setTimeout(() => {
    // 生成模拟的数据手册内容
    const datasheetContent = generateMockDatasheet(row);
    
    pdfViewer.innerHTML = `
      <div class="datasheet-content">
        ${datasheetContent}
      </div>
    `;
  }, 300);
  
  // 初始化下载按钮
  const downloadBtn = document.getElementById('downloadPDFBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      downloadPDF(row);
    });
  }
}

// 生成模拟数据手册内容
function generateMockDatasheet(row) {
  return `
    <div class="datasheet-header">
      <div class="datasheet-logo">${row.manufacturer}</div>
      <div class="datasheet-title">${row.partNumber}</div>
      <div class="datasheet-subtitle">${row.category} 数据手册</div>
    </div>
    
    <div class="datasheet-section">
      <h2 class="section-title">产品概述</h2>
      <p class="section-content">
        ${row.partNumber} 是一款由 ${row.manufacturer} 生产的高性能${row.category}器件。
        该产品采用先进的制造工艺，具有优异的电气特性和可靠性。
      </p>
    </div>
    
    <div class="datasheet-section">
      <h2 class="section-title">主要特性</h2>
      <ul class="feature-list">
        <li>工作电压范围：${row.voltage}</li>
        <li>额定电流：${row.current}</li>
        <li>封装形式：${row.package}</li>
        <li>工作温度范围：-40°C 至 +125°C</li>
        <li>符合 RoHS 环保标准</li>
        <li>低功耗设计</li>
        <li>高可靠性，适用于工业级应用</li>
      </ul>
    </div>
    
    <div class="datasheet-section">
      <h2 class="section-title">电气参数</h2>
      <table class="param-table">
        <thead>
          <tr>
            <th>参数</th>
            <th>符号</th>
            <th>最小值</th>
            <th>典型值</th>
            <th>最大值</th>
            <th>单位</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>工作电压</td>
            <td>V<sub>DD</sub></td>
            <td>-</td>
            <td>${row.voltage}</td>
            <td>-</td>
            <td>V</td>
          </tr>
          <tr>
            <td>额定电流</td>
            <td>I<sub>D</sub></td>
            <td>-</td>
            <td>${row.current}</td>
            <td>-</td>
            <td>A</td>
          </tr>
          <tr>
            <td>导通电阻</td>
            <td>R<sub>DS(ON)</sub></td>
            <td>-</td>
            <td>0.05</td>
            <td>0.08</td>
            <td>Ω</td>
          </tr>
          <tr>
            <td>栅极电压</td>
            <td>V<sub>GS</sub></td>
            <td>2.0</td>
            <td>4.5</td>
            <td>20</td>
            <td>V</td>
          </tr>
          <tr>
            <td>功耗</td>
            <td>P<sub>D</sub></td>
            <td>-</td>
            <td>1.2</td>
            <td>2.5</td>
            <td>W</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="datasheet-section">
      <h2 class="section-title">应用领域</h2>
      <ul class="feature-list">
        <li>电源管理系统</li>
        <li>DC-DC 转换器</li>
        <li>电池充电管理</li>
        <li>马达驱动控制</li>
        <li>负载开关</li>
        <li>消费电子产品</li>
      </ul>
    </div>
    
    <div class="datasheet-section">
      <h2 class="section-title">封装信息</h2>
      <div class="package-info">
        <div class="package-diagram">
          <div class="package-box">
            <div class="package-label">${row.package}</div>
            <div class="package-desc">封装示意图</div>
          </div>
        </div>
        <div class="package-details">
          <p><strong>封装类型：</strong>${row.package}</p>
          <p><strong>引脚数量：</strong>3</p>
          <p><strong>安装方式：</strong>表面贴装</p>
          <p><strong>封装尺寸：</strong>请参考机械尺寸图</p>
        </div>
      </div>
    </div>
    
    <div class="datasheet-section">
      <h2 class="section-title">订购信息</h2>
      <table class="param-table">
        <thead>
          <tr>
            <th>型号</th>
            <th>封装</th>
            <th>温度范围</th>
            <th>库存</th>
            <th>价格</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${row.partNumber}</td>
            <td>${row.package}</td>
            <td>-40°C ~ +125°C</td>
            <td>${formatNumber(row.stock)}</td>
            <td>¥${row.price}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="datasheet-footer">
      <p>© ${new Date().getFullYear()} ${row.manufacturer}. 版权所有。</p>
      <p class="footer-note">本文档为演示数据，仅供参考。实际参数请以官方发布的数据手册为准。</p>
    </div>
  `;
}

// 下载PDF（全局函数，供HTML调用）
window.downloadPDF = function(row) {
  // 模拟下载
  showMessage(`正在下载 ${row.partNumber} 的数据手册...`, 'success');
  
  // 在实际应用中，这里应该触发真实的文件下载
  // const link = document.createElement('a');
  // link.href = pdfUrl;
  // link.download = `${row.partNumber}_datasheet.pdf`;
  // link.click();
};

// 下载导入模板（全局函数，供HTML调用）
window.downloadImportTemplate = function() {
  // CSV模板内容（包含表头和示例数据）
  const csvContent = `物料编码,制造商,类别,电压,电流,封装
TI-74HC00D,Texas Instruments,MOSFET,5V,8mA,SOIC-14
ST-MOSFET-2N7000,STMicroelectronics,MOSFET,60V,200mA,TO-92
NXP-BSS138,NXP Semiconductors,MOSFET,50V,200mA,SOT-23`;
  
  // 创建Blob对象（添加BOM以支持Excel正确打开中文）
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // 创建下载链接
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = '批量导入模板.csv';
  link.style.display = 'none';
  
  // 触发下载
  document.body.appendChild(link);
  link.click();
  
  // 清理
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  showMessage('模板下载成功', 'success');
};

// 初始化Datasheet文件上传功能
function initDatasheetFileUpload() {
  const fileInput = document.getElementById('datasheetFileUpload');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        files.forEach(file => {
          uploadedDatasheetFiles.push({
            name: file.name,
            size: file.size
          });
        });
        // 更新文件列表显示
        updateUploadedFilesList();
        // 重新绑定事件
        initDatasheetFileUpload();
      }
      // 清空文件输入框，允许重复选择相同文件
      e.target.value = '';
    });
  }
}

// 更新已上传文件列表显示
function updateUploadedFilesList() {
  const listContainer = document.getElementById('uploadedFilesList');
  if (!listContainer) return;
  
  if (uploadedDatasheetFiles.length === 0) {
    listContainer.innerHTML = '<div class="uploaded-files-empty">暂无文件</div>';
    return;
  }
  
  listContainer.innerHTML = uploadedDatasheetFiles.map((file, index) => `
    <div class="uploaded-file-item" data-index="${index}">
      <div class="uploaded-file-info">
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2" style="flex-shrink: 0; margin-right: 8px; opacity: 0.6;">
          <path d="M2 1.5h5.5L10 4.5v6H2v-9z" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.5 1.5v3h3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="uploaded-file-name">${file.name}</span>
        <span class="uploaded-file-size">${(file.size / 1024).toFixed(2)} KB</span>
      </div>
      <button type="button" class="uploaded-file-remove" onclick="removeUploadedFile(${index})" title="删除">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `).join('');
}

// 删除已上传的文件（全局函数）
window.removeUploadedFile = function(index) {
  if (index >= 0 && index < uploadedDatasheetFiles.length) {
    uploadedDatasheetFiles.splice(index, 1);
    updateUploadedFilesList();
    // 重新绑定文件上传事件
    initDatasheetFileUpload();
  }
};

// ========== Datasheet解析任务管理 ==========

// 更新任务通知按钮
function updateTaskNotificationButton() {
  const badge = document.getElementById('taskNotificationBadge');
  if (!badge) return;
  
  // 计算正在处理的任务数量（等待中 + 解析中）
  const processingCount = datasheetTasks.filter(task => 
    task.status === 'waiting' || task.status === 'parsing'
  ).length;
  
  if (processingCount > 0) {
    badge.textContent = processingCount;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}

// 渲染任务通知列表
function renderTaskNotificationList() {
  const listContainer = document.getElementById('taskNotificationList');
  if (!listContainer) return;
  
  if (datasheetTasks.length === 0) {
    listContainer.innerHTML = '<div class="task-notification-empty">暂无任务</div>';
    return;
  }
  
  listContainer.innerHTML = datasheetTasks.map(task => {
    const statusText = {
      waiting: '等待中',
      parsing: '解析中',
      success: '入库成功',
      failed: '解析失败'
    };
    
    const statusClass = {
      waiting: 'status-waiting',
      parsing: 'status-parsing',
      success: 'status-success',
      failed: 'status-failed'
    };
    
    const errorReasonText = {
      wrong_category: '非当前分类数据',
      params_failed: '必要参数提取失败',
      network_error: '网络异常'
    };
    
    const errorHint = task.status === 'failed' && task.errorReason 
      ? `title="${errorReasonText[task.errorReason] || '解析失败'}"`
      : '';
    
    // 处理中的任务（等待中、解析中）可以关闭
    const canClose = task.status === 'waiting' || task.status === 'parsing';
    const closeBtn = canClose ? 
      `<button class="task-item-close" onclick="cancelTask(${task.id})" title="放弃此任务">×</button>` : 
      '';
    
    return `
      <div class="task-notification-item ${statusClass[task.status]}" ${errorHint}>
        <div class="task-item-header">
          <span class="task-item-name">${task.fileName}</span>
          <div class="task-item-right">
            <span class="task-item-status ${statusClass[task.status]}">${statusText[task.status]}</span>
            ${closeBtn}
          </div>
        </div>
        ${task.status === 'failed' && task.errorReason ? 
          `<div class="task-item-error">${errorReasonText[task.errorReason] || '解析失败'}</div>` : 
          ''
        }
      </div>
    `;
  }).join('');
}

// 切换任务通知菜单（全局函数）
window.toggleTaskNotificationMenu = function(event) {
  event.stopPropagation();
  const menu = document.getElementById('taskNotificationMenu');
  if (menu) {
    menu.classList.toggle('show');
  }
};

// 开始处理任务（模拟）
function startProcessingTasks() {
  // 获取所有等待中的任务（不包括已经成功、失败和一直解析中的任务）
  const waitingTasks = datasheetTasks.filter(task => 
    task.status === 'waiting' && !task.isPermanentParsing
  );
  
  if (waitingTasks.length === 0) return;
  
  // 模拟处理任务
  waitingTasks.forEach((task, index) => {
    setTimeout(() => {
      // 检查任务是否还存在（可能已被取消）
      if (!datasheetTasks.find(t => t.id === task.id)) return;
      
      // 更新状态为解析中
      task.status = 'parsing';
      updateTaskNotificationButton();
      renderTaskNotificationList();
      
      // 模拟解析过程（2-5秒）
      const parseDuration = 2000 + Math.random() * 3000;
      setTimeout(() => {
        // 检查任务是否还存在（可能已被取消）
        if (!datasheetTasks.find(t => t.id === task.id)) return;
        
        // 随机决定成功或失败（70%成功率）
        const success = Math.random() > 0.3;
        
        if (success) {
          task.status = 'success';
        } else {
          task.status = 'failed';
          // 随机选择一个失败原因
          const reasons = ['wrong_category', 'params_failed', 'network_error'];
          task.errorReason = reasons[Math.floor(Math.random() * reasons.length)];
        }
        
        updateTaskNotificationButton();
        renderTaskNotificationList();
      }, parseDuration);
    }, index * 500); // 每个任务延迟500ms开始
  });
}

// 取消任务（全局函数）
window.cancelTask = function(taskId) {
  // 从任务列表中移除该任务
  const index = datasheetTasks.findIndex(t => t.id === taskId);
  if (index > -1) {
    datasheetTasks.splice(index, 1);
    updateTaskNotificationButton();
    renderTaskNotificationList();
  }
};

