# 发布到 GitHub 指南

## 步骤 1: 在 GitHub 上创建仓库

1. 访问 https://github.com/new
2. Repository name: `siliconbom-data`
3. 选择 Public 或 Private
4. **不要**勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

## 步骤 2: 推送代码

在项目目录下执行以下命令（将 `YOUR_USERNAME` 替换为你的 GitHub 用户名）：

```bash
cd "/Users/mac/Downloads/工作文件/cursor项目集/硅宝数据后台"

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/siliconbom-data.git

# 推送代码
git push -u origin main
```

## 步骤 3: 配置 GitHub Pages（可选）

如果你想通过 GitHub Pages 在线访问：

1. 在 GitHub 仓库页面，点击 Settings
2. 左侧菜单选择 Pages
3. Source 选择 `main` 分支
4. 点击 Save
5. 等待几分钟后，访问：`https://YOUR_USERNAME.github.io/siliconbom-data/`

## 注意事项

- 如果使用 HTTPS，推送时可能需要输入 GitHub 用户名和密码（或 Personal Access Token）
- 如果使用 SSH，需要先配置 SSH 密钥
- 首次推送可能需要几分钟时间

