// 数据管理逻辑

// 模拟数据表列表
const mockTables = [
  { id: 1, alias: 'MOSFET', name: 'parts_catalog', rows: 98420110, updateTime: '2025-01-15 18:30:00' },
  { id: 2, alias: '三极管', name: 'bom_items', rows: 64118902, updateTime: '2025-01-15 17:45:00' },
  { id: 3, alias: '电阻', name: 'inventory_quotes', rows: 41006700, updateTime: '2025-01-15 16:20:00' },
  { id: 4, alias: '电容', name: 'param_index', rows: 29880114, updateTime: '2025-01-15 15:10:00' },
  { id: 5, alias: '电感', name: 'datasheet_meta', rows: 18204982, updateTime: '2025-01-15 14:30:00' },
  { id: 6, alias: '二极管', name: 'component_specs', rows: 15234056, updateTime: '2025-01-15 13:15:00' },
  { id: 7, alias: 'IC芯片', name: 'package_info', rows: 12890123, updateTime: '2025-01-15 12:00:00' },
  { id: 8, alias: '连接器', name: 'supplier_data', rows: 9876543, updateTime: '2025-01-15 11:20:00' },
];

// 模拟表明细数据（第一页10条）
const mockTableData = {
  parts_catalog: [
    { id: 1, partNumber: 'TI-74HC00D', manufacturer: 'Texas Instruments', category: 'MOSFET', voltage: '5V', current: '8mA', package: 'SOIC-14', stock: 1250, price: 0.25, inputMethod: 'manual', datasheetUrl: 'https://www.ti.com/lit/ds/symlink/74hc00.pdf' },
    { id: 2, partNumber: 'ST-MOSFET-2N7000', manufacturer: 'STMicroelectronics', category: 'MOSFET', voltage: '60V', current: '200mA', package: 'TO-92', stock: 3200, price: 0.15, inputMethod: 'datasheet', datasheetUrl: 'https://www.st.com/resource/en/datasheet/2n7000.pdf' },
    { id: 3, partNumber: 'INF-IPB60N06S4', manufacturer: 'Infineon', category: 'MOSFET', voltage: '60V', current: '50A', package: 'TO-263', stock: 850, price: 1.25, inputMethod: 'import', datasheetUrl: '' },
    { id: 4, partNumber: 'NXP-BSS138', manufacturer: 'NXP Semiconductors', category: 'MOSFET', voltage: '50V', current: '200mA', package: 'SOT-23', stock: 5600, price: 0.12, inputMethod: 'manual', datasheetUrl: 'https://www.nxp.com/docs/en/data-sheet/BSS138.pdf' },
    { id: 5, partNumber: 'ON-FDMS86101', manufacturer: 'ON Semiconductor', category: 'MOSFET', voltage: '30V', current: '30A', package: 'Power33', stock: 420, price: 0.85, inputMethod: 'datasheet', datasheetUrl: '' },
    { id: 6, partNumber: 'VISHAY-SI2302', manufacturer: 'Vishay', category: 'MOSFET', voltage: '20V', current: '4.2A', package: 'SOT-23', stock: 2100, price: 0.18, inputMethod: 'import', datasheetUrl: 'https://www.vishay.com/docs/70660/70660.pdf' },
    { id: 7, partNumber: 'FAIRCHILD-2N7002', manufacturer: 'Fairchild', category: 'MOSFET', voltage: '60V', current: '115mA', package: 'SOT-23', stock: 3800, price: 0.10, inputMethod: 'manual', datasheetUrl: '' },
    { id: 8, partNumber: 'ROHM-2SK3019', manufacturer: 'ROHM', category: 'MOSFET', voltage: '60V', current: '5A', package: 'TO-220', stock: 650, price: 0.55, inputMethod: 'datasheet', datasheetUrl: 'https://www.rohm.com/datasheet/2SK3019' },
    { id: 9, partNumber: 'TOSHIBA-2SK2231', manufacturer: 'Toshiba', category: 'MOSFET', voltage: '200V', current: '6A', package: 'TO-220', stock: 320, price: 1.15, inputMethod: 'import', datasheetUrl: '' },
    { id: 10, partNumber: 'DIODES-DMN2041L', manufacturer: 'Diodes Inc', category: 'MOSFET', voltage: '20V', current: '4.5A', package: 'SOT-23', stock: 1800, price: 0.22, inputMethod: 'manual', datasheetUrl: 'https://www.diodes.com/assets/Datasheets/DMN2041L.pdf' },
  ]
};

// 当前页面状态
let currentView = 'catalog'; // 'catalog' 或 'detail'
let currentTable = null;
let currentPage = 1;
let pageSize = 10;
let searchFilters = {
  partNumber: '',
  manufacturer: '',
  voltage: '',
  current: '',
  inputMethod: ''
};

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
      <h1 style="font-size: 20px; font-weight: 700; margin-bottom: 20px;">数据管理</h1>
      <div class="table-catalog" id="tableCatalog"></div>
    </div>
  `;
  
  renderTableCatalog();
}

// 渲染表目录
function renderTableCatalog() {
  const catalog = document.getElementById('tableCatalog');
  if (!catalog) return;
  
  catalog.innerHTML = mockTables.map(table => `
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
          <div class="action-dropdown">
            <button class="btn btn-primary action-dropdown-btn" id="addDataBtn">录入数据</button>
            <div class="action-dropdown-menu" id="addDataMenu">
              <button class="action-dropdown-item" onclick="openAddModal('manual')">手动录入</button>
              <button class="action-dropdown-item" onclick="openAddModal('import')">批量导入</button>
              <button class="action-dropdown-item" onclick="openAddModal('datasheet')">Datasheet解析</button>
            </div>
          </div>
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
      key !== 'id' && key !== 'stock' && key !== 'price' && key !== 'datasheetUrl'
    );
    tableHead.innerHTML = `
      <tr>
        ${columns.map(col => `<th>${getColumnName(col)}</th>`).join('')}
        <th class="sticky-actions-header" style="width: 180px;">操作</th>
      </tr>
    `;
    
    // 渲染表体
    tableBody.innerHTML = pageData.map(row => `
      <tr>
        ${columns.map(col => `<td class="mono">${formatCellValue(row[col], col)}</td>`).join('')}
        <td class="sticky-actions-cell">
          <div class="data-table-actions">
            <button class="action-btn edit" onclick="editRow(${row.id})">编辑</button>
            <button class="action-btn delete" onclick="deleteRow(${row.id})">删除</button>
            <button class="action-btn manual" onclick="openDataManual(${row.id})">数据手册</button>
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
    inputMethod: '录入方式'
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

// 格式化单元格值
function formatCellValue(value, key) {
  if (value === null || value === undefined) return '-';
  if (key === 'inputMethod') {
    return getInputMethodText(value);
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

// 打开添加弹窗（全局函数，供HTML调用）
window.openAddModal = function(type) {
  const modal = createModal('录入数据', getAddFormHTML(type), () => {
    const form = document.getElementById('addForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAddSubmit(type);
      });
    }
  });
  
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 10);
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
          <div style="font-size: 12px; color: var(--muted); padding: 8px; background: rgba(255,255,255,.02); border-radius: 4px;">
            支持 CSV、Excel 格式，第一行为表头，包含：物料编码、制造商、类别、电压、电流、封装
          </div>
        </div>
      </form>
    `;
  } else if (type === 'datasheet') {
    return `
      <form id="addForm">
        <div class="form-group">
          <label class="form-label">上传Datasheet文件</label>
          <input type="file" class="form-input" name="file" accept=".pdf,.doc,.docx" required>
        </div>
        <div class="form-group">
          <label class="form-label">或粘贴Datasheet内容</label>
          <textarea class="form-textarea" name="content" placeholder="粘贴Datasheet文本内容..."></textarea>
        </div>
        <div style="font-size: 12px; color: var(--muted);">
          系统将自动解析Datasheet并提取关键参数信息
        </div>
      </form>
    `;
  }
  return '';
}

// 处理添加提交
function handleAddSubmit(type) {
  if (type === 'manual') {
    const form = document.getElementById('addForm');
    const formData = new FormData(form);
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
      datasheetUrl: '',
      inputMethod: 'manual'
    };
    
    const allData = mockTableData[currentTable.name] || [];
    allData.unshift(newRow);
    mockTableData[currentTable.name] = allData;
    
    closeModal();
    renderTableData();
    showMessage('添加成功', 'success');
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
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleEditSubmit(row.id);
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
    </form>
  `;
}

// 处理编辑提交
function handleEditSubmit(id) {
  const form = document.getElementById('editForm');
  const formData = new FormData(form);
  
  const allData = mockTableData[currentTable.name] || [];
  const index = allData.findIndex(r => r.id === id);
  if (index > -1) {
    allData[index] = {
      ...allData[index],
      partNumber: formData.get('partNumber'),
      manufacturer: formData.get('manufacturer'),
      category: formData.get('category'),
      voltage: formData.get('voltage'),
      current: formData.get('current'),
      package: formData.get('package')
    };
    
    closeModal();
    renderTableData();
    showMessage('编辑成功', 'success');
  }
}

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

