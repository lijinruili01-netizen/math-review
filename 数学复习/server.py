from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# API配置 - 可以通过环境变量或配置文件设置
API_KEY = os.environ.get('DEEPSEEK_API_KEY', 'sk-b9eca93dff7c490e9067df2dab8b66a6')

API_CONFIG = {
    'endpoint': 'https://api.deepseek.com/v1/chat/completions',
    'api_key': API_KEY,
    'model': 'deepseek-chat'
}

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        response = requests.post(
            API_CONFIG['endpoint'],
            headers={
                'Content-Type': 'application/json',
                'Authorization': f"Bearer {API_CONFIG['api_key']}"
            },
            json={
                'model': API_CONFIG['model'],
                'messages': [
                    {
                        'role': 'system',
                        'content': '你是一位专业的高等数学教师助手，擅长解答大一高等数学C的各类问题。请用清晰、详细的方式解答学生的问题，包括解题步骤和必要的数学公式。'
                    },
                    {
                        'role': 'user',
                        'content': user_message
                    }
                ],
                'temperature': 0.7,
                'max_tokens': 2000
            }
        )
        
        if response.status_code == 200:
            result = response.json()
            ai_message = result['choices'][0]['message']['content']
            return jsonify({'success': True, 'message': ai_message})
        else:
            return jsonify({
                'success': False, 
                'error': f'API请求失败: {response.status_code}',
                'details': response.text
            }), response.status_code
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/')
def index():
    return '''
    <h1>高等数学复习API服务器</h1>
    <p>状态: 运行中 ✅</p>
    <p>前端页面: <a href="http://localhost:8000">http://localhost:8000</a></p>
    <hr>
    <h3>API密钥配置</h3>
    <p>当前使用的API密钥: {}...{}</p>
    <p>如需使用自己的API密钥，请修改 server.py 第8行</p>
    '''.format(API_CONFIG['api_key'][:10], API_CONFIG['api_key'][-6:])

if __name__ == '__main__':
    print('=' * 60)
    print('    高等数学复习API服务器启动成功！')
    print('=' * 60)
    print(f'  前端页面: http://localhost:8000')
    print(f'  API服务器: http://localhost:5000')
    print(f'  API密钥: {API_CONFIG["api_key"][:10]}...{API_CONFIG["api_key"][-6:]}')
    print('=' * 60)
    print('  按 Ctrl+C 停止服务器')
    print('=' * 60)
    app.run(host='0.0.0.0', port=5000, debug=True)
