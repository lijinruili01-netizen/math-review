# 高等数学C复习平台 - Vercel部署指南

## 🚀 10分钟完成在线部署

部署完成后，朋友只需访问网址即可使用，无需安装任何软件！

## 📋 部署前准备

### 1. 注册账号
- **GitHub账号**：https://github.com （如果没有）
- **Vercel账号**：https://vercel.com （用GitHub账号登录即可）

### 2. 安装Git（如果没有）
- 下载：https://git-scm.com/downloads
- 安装后重启电脑

## 🎯 部署步骤

### 第一步：创建GitHub仓库

1. **访问GitHub**：https://github.com/new

2. **填写仓库信息**：
   - Repository name: `math-review`（或其他名字）
   - Description: `高等数学C复习平台`
   - 选择 **Public**（公开）
   - ✅ 勾选 "Add a README file"
   - 点击 **Create repository**

### 第二步：上传代码到GitHub

**方法一：使用GitHub网页上传**（推荐新手）

1. 在仓库页面，点击 **Add file** → **Upload files**

2. 将以下文件拖拽上传：
   ```
   ✅ index.html
   ✅ style.css
   ✅ script.js
   ✅ vercel.json
   ✅ .gitignore
   ✅ README.md
   ✅ requirements.txt
   ✅ api/chat.py（需要先创建api文件夹）
   ```

3. 填写提交信息："Initial commit"

4. 点击 **Commit changes**

**方法二：使用Git命令行**（熟悉Git的用户）

```bash
# 在"数学复习"文件夹中打开命令行
cd "c:\Users\lijinrui\Desktop\数学复习"

# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 连接到GitHub仓库（替换为你的用户名和仓库名）
git remote add origin https://github.com/你的用户名/math-review.git

# 推送代码
git branch -M main
git push -u origin main
```

### 第三步：部署到Vercel

1. **访问Vercel**：https://vercel.com

2. **登录**：使用GitHub账号登录

3. **导入项目**：
   - 点击 **Add New...** → **Project**
   - 选择你刚创建的 `math-review` 仓库
   - 点击 **Import**

4. **配置环境变量**：
   - 在 **Environment Variables** 部分
   - 添加变量：
     - Name: `DEEPSEEK_API_KEY`
     - Value: `sk-b9eca93dff7c490e9067df2dab8b66a6`（你的API密钥）
   - 点击 **Add**

5. **部署**：
   - 点击 **Deploy**
   - 等待1-2分钟...

6. **完成**！🎉
   - 你会看到 "Congratulations!" 页面
   - 获得部署网址，例如：`https://math-review.vercel.app`

## 🌐 分享给朋友

部署成功后，你可以：

1. **复制网址**：例如 `https://math-review.vercel.app`

2. **发送给朋友**：
   ```
   高数复习神器上线了！🎉
   
   网址：https://math-review.vercel.app
   
   功能：
   ✅ 6大章节知识点
   ✅ 16道经典题目
   ✅ AI智能答疑（随便问！）
   
   直接打开就能用，超级方便！
   ```

3. **朋友只需**：
   - 打开网址
   - 开始使用
   - 就这么简单！

## 🎨 自定义域名（可选）

如果你有自己的域名（如 `math.example.com`）：

1. 在Vercel项目设置中
2. 进入 **Domains**
3. 添加你的域名
4. 按照提示配置DNS

## 🔄 更新网站

如果你修改了代码：

1. **方法一：GitHub网页**
   - 在GitHub仓库中直接编辑文件
   - 保存后Vercel自动重新部署

2. **方法二：Git命令**
   ```bash
   git add .
   git commit -m "更新说明"
   git push
   ```

Vercel会自动检测更新并重新部署！

## 📊 监控使用情况

### 查看访问量
1. 登录Vercel控制台
2. 查看项目的Analytics

### 监控API使用
1. 访问DeepSeek控制台：https://platform.deepseek.com/
2. 查看Usage（使用量）
3. 设置用量提醒

## ⚙️ 高级设置

### 设置访问限制（可选）

如果想限制访问（例如只允许特定朋友）：

1. 在代码中添加简单的密码验证
2. 或使用Vercel的访问保护功能（需要Pro计划）

### 设置API配额限制

在DeepSeek控制台设置每月最大使用额度，避免超支。

## 💰 费用说明

### Vercel费用
- ✅ **完全免费**（Hobby计划）
- 每月100GB带宽
- 无限制的网站
- 对个人项目完全够用

### DeepSeek API费用
- 输入：约 ¥0.001/千字
- 输出：约 ¥0.002/千字
- **预计**：5-10个朋友使用，每月 ¥10-20

建议：在DeepSeek设置月度预算提醒

## ❓ 常见问题

### Q: 部署失败怎么办？
**A:** 检查：
- vercel.json文件是否正确
- api/chat.py文件是否在正确位置
- 环境变量是否正确设置

### Q: AI不回复？
**A:** 检查：
- Vercel环境变量中的API密钥是否正确
- 在Vercel控制台查看Function Logs

### Q: 如何查看错误日志？
**A:** 
1. 登录Vercel控制台
2. 进入项目
3. 点击 **Deployments**
4. 查看 **Function Logs**

### Q: 想要更换API密钥？
**A:**
1. 进入Vercel项目设置
2. **Settings** → **Environment Variables**
3. 修改 `DEEPSEEK_API_KEY`
4. 重新部署

## 📞 需要帮助？

如果遇到问题：
1. 查看Vercel部署日志
2. 查看Function Logs
3. 检查API密钥是否有效
4. 确认GitHub代码已正确上传

## 🎉 总结

完成部署后，你的网站：
- ✅ 永久在线，访问速度快
- ✅ 自动HTTPS加密
- ✅ 朋友直接访问网址即可使用
- ✅ 完全免费（除了少量API费用）
- ✅ 自动备份，不会丢失

**享受你的在线高数复习平台吧！** 🎓

---

**部署时间**：约10分钟  
**难度**：⭐⭐☆☆☆（简单）  
**效果**：⭐⭐⭐⭐⭐（完美）
