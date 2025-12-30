# 硅宝数据平台 (SiliconBOM Data Platform)

硅宝智能体产品的结构化数据库后台管理系统，用于管理观测硅宝依赖的后台数据。

## 在线演示

[GitHub Pages](https://your-username.github.io/siliconbom-data/) (待配置)

## 项目结构

```
硅宝数据后台/
├── index.html              # 登录页面
├── dashboard.html          # 工作台
├── data-management.html    # 数据管理
├── log-management.html    # 日志管理
├── css/
│   ├── common.css         # 通用样式
│   ├── layout.css         # 布局样式
│   ├── login.css          # 登录页样式
│   ├── dashboard.css       # 工作台样式
│   ├── data-management.css # 数据管理样式
│   └── log-management.css  # 日志管理样式
└── js/
    ├── common.js           # 通用工具函数
    ├── layout.js           # 布局逻辑
    ├── login.js            # 登录逻辑
    ├── dashboard.js        # 工作台逻辑
    ├── data-management.js  # 数据管理逻辑
    └── log-management.js   # 日志管理逻辑
```

## 功能说明

### 1. 系统登录
- 固定账号：`admin`
- 固定密码：`admin123`
- 登录后自动跳转到工作台

### 2. 工作台（Dashboard）
- 展示数据平台的各项运行数据
- KPI指标：数据总行数、数据表总数、数据总Size、查询总次数等
- 数据量级排名：Top5数据表和Top5品牌
- 查询次数趋势图
- 表查询次数Top5

### 3. 数据管理
- **数据目录**：以卡片形式展示所有数据表
  - 显示表别称、表名称、数据行数、最近更新时间
- **表明细页**：点击卡片进入表明细页
  - 数据表格展示，支持关键字段搜索
  - 每行数据支持编辑和删除
  - 右上角录入数据按钮（hover显示三个选项）：
    - 手动录入
    - 导入
    - Datasheet解读
  - 查询测试按钮：右侧弹出抽屉，提供对话式SQL查询界面

### 4. 日志管理
- 日志列表展示所有表的查询记录
- 记录信息：日志ID、表名称、时间、SQL、执行结果、执行来源
- 支持按表名称、执行来源、时间范围进行筛选

## 使用方法

1. 直接在浏览器中打开 `index.html` 文件
2. 使用固定账号密码登录：`admin` / `admin123`
3. 登录后可以访问各个功能模块

## 技术特点

- 纯前端实现，无需后端服务器
- HTML、CSS、JS分离，标准前端工程结构
- 深灰色主题，简约清晰的设计风格
- 使用LocalStorage存储登录状态
- 模拟数据，适合演示和产品介绍

## 注意事项

- 所有数据均为模拟数据，仅用于演示
- 登录状态存储在浏览器LocalStorage中
- 数据修改仅在当前会话有效，刷新页面后会恢复
- 部分功能（如导入、Datasheet解读）为演示界面，实际功能需后端支持

