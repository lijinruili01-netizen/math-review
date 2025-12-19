@echo off
chcp 65001 >nul
echo ===============================================
echo    高等数学C复习平台 - 完整启动脚本
echo ===============================================
echo.
echo 正在检查并安装依赖...
pip install -q -r requirements.txt
echo.
echo ===============================================
echo 启动成功！请按照以下步骤操作：
echo ===============================================
echo.
echo 1. 保持此窗口打开（后端服务器）
echo 2. 在浏览器中访问: http://localhost:8000
echo 3. 点击"AI答疑"即可使用AI问答功能
echo.
echo 按 Ctrl+C 可停止所有服务
echo ===============================================
echo.

:: 启动后端API服务器（在后台）
start /B python server.py

:: 等待后端启动
timeout /t 3 /nobreak >nul

:: 启动前端服务器
python -m http.server 8000
