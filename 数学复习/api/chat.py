from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.error

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # 处理CORS
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

        # 读取请求数据
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            # 解析JSON数据
            data = json.loads(post_data.decode('utf-8'))
            user_message = data.get('message', '')
            
            # 获取API密钥
            api_key = os.environ.get('DEEPSEEK_API_KEY', 'sk-b9eca93dff7c490e9067df2dab8b66a6')
            
            # 准备API请求
            api_url = 'https://api.deepseek.com/v1/chat/completions'
            api_data = {
                'model': 'deepseek-chat',
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
            
            # 发送请求到DeepSeek API
            request = urllib.request.Request(
                api_url,
                data=json.dumps(api_data).encode('utf-8'),
                headers={
                    'Content-Type': 'application/json',
                    'Authorization': f'Bearer {api_key}'
                }
            )
            
            with urllib.request.urlopen(request) as response:
                result = json.loads(response.read().decode('utf-8'))
                ai_message = result['choices'][0]['message']['content']
                
                # 返回成功响应
                response_data = {
                    'success': True,
                    'message': ai_message
                }
                self.wfile.write(json.dumps(response_data).encode('utf-8'))
                
        except Exception as e:
            # 返回错误响应
            error_response = {
                'success': False,
                'error': str(e)
            }
            self.wfile.write(json.dumps(error_response).encode('utf-8'))
    
    def do_OPTIONS(self):
        # 处理预检请求
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
