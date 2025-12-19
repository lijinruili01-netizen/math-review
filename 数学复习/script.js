// API 配置 - 自动适配本地和Vercel部署
const API_CONFIG = {
    endpoint: '/api/chat',  // 使用相对路径，自动适配部署环境
    localProxy: true
};

// 题库数据
const questionsData = [
    // 第一章：极限与连续
    {
        id: 1,
        chapter: 1,
        chapterName: '极限与连续',
        difficulty: 'easy',
        question: '求极限：lim(x→0) (sin x) / x',
        answer: '解：这是一个重要极限。\n根据重要极限公式：lim(x→0) (sin x) / x = 1\n因此答案为 1。',
        hint: '这是第一个重要极限公式，需要熟记。'
    },
    {
        id: 2,
        chapter: 1,
        chapterName: '极限与连续',
        difficulty: 'medium',
        question: '求极限：lim(x→∞) (1 + 1/x)^x',
        answer: '解：这是第二个重要极限。\n根据重要极限公式：lim(x→∞) (1 + 1/x)^x = e\n因此答案为 e ≈ 2.71828。',
        hint: '第二个重要极限，结果是自然对数的底e。'
    },
    {
        id: 3,
        chapter: 1,
        chapterName: '极限与连续',
        difficulty: 'medium',
        question: '判断函数 f(x) = |x| / x 在 x = 0 处的连续性',
        answer: '解：\n1) 左极限：lim(x→0⁻) f(x) = -1\n2) 右极限：lim(x→0⁺) f(x) = 1\n3) 因为左极限 ≠ 右极限，所以极限不存在\n4) f(0) 也不存在（分母为0）\n结论：函数在 x = 0 处不连续（第一类间断点-跳跃间断点）。',
        hint: '注意分析左右极限，以及函数值是否存在。'
    },

    // 第二章：导数与微分
    {
        id: 4,
        chapter: 2,
        chapterName: '导数与微分',
        difficulty: 'easy',
        question: '求函数 f(x) = x³ + 2x² - 5x + 1 的导数',
        answer: '解：使用基本求导公式\nf\'(x) = 3x² + 4x - 5',
        hint: '幂函数求导：(xⁿ)\' = n·xⁿ⁻¹'
    },
    {
        id: 5,
        chapter: 2,
        chapterName: '导数与微分',
        difficulty: 'medium',
        question: '求函数 y = e^x · sin x 的导数',
        answer: '解：使用乘法求导法则 (uv)\' = u\'v + uv\'\n令 u = e^x, v = sin x\nu\' = e^x, v\' = cos x\ny\' = e^x · sin x + e^x · cos x = e^x(sin x + cos x)',
        hint: '注意使用乘法求导法则。'
    },
    {
        id: 6,
        chapter: 2,
        chapterName: '导数与微分',
        difficulty: 'hard',
        question: '求隐函数 x² + y² = 25 确定的 y 对 x 的导数',
        answer: '解：方程两边对 x 求导\n2x + 2y · dy/dx = 0\n2y · dy/dx = -2x\ndy/dx = -x/y',
        hint: '隐函数求导时，记得 y 是 x 的函数，要用复合函数求导。'
    },

    // 第三章：微分中值定理
    {
        id: 7,
        chapter: 3,
        chapterName: '微分中值定理',
        difficulty: 'medium',
        question: '叙述罗尔定理的条件和结论',
        answer: '解：罗尔定理\n条件：\n1) f(x) 在 [a,b] 上连续\n2) f(x) 在 (a,b) 内可导\n3) f(a) = f(b)\n结论：至少存在一点 ξ ∈ (a,b)，使得 f\'(ξ) = 0',
        hint: '罗尔定理是其他中值定理的基础。'
    },
    {
        id: 8,
        chapter: 3,
        chapterName: '微分中值定理',
        difficulty: 'hard',
        question: '证明方程 x³ - 3x + 1 = 0 在区间 (0,1) 内至少有一个实根',
        answer: '解：令 f(x) = x³ - 3x + 1\n1) f(x) 在 [0,1] 上连续\n2) f(0) = 1 > 0\n3) f(1) = 1 - 3 + 1 = -1 < 0\n4) 因为 f(0) · f(1) < 0\n根据零点定理（介值定理的推论），f(x) 在 (0,1) 内至少有一个零点，即方程至少有一个实根。',
        hint: '利用零点定理（连续函数的介值定理）。'
    },

    // 第四章：不定积分
    {
        id: 9,
        chapter: 4,
        chapterName: '不定积分',
        difficulty: 'easy',
        question: '求不定积分：∫ (3x² + 2x - 1) dx',
        answer: '解：使用基本积分公式\n∫ (3x² + 2x - 1) dx = x³ + x² - x + C',
        hint: '∫ xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ -1)'
    },
    {
        id: 10,
        chapter: 4,
        chapterName: '不定积分',
        difficulty: 'medium',
        question: '求不定积分：∫ x·e^x dx',
        answer: '解：使用分部积分法 ∫ u dv = uv - ∫ v du\n令 u = x, dv = e^x dx\n则 du = dx, v = e^x\n∫ x·e^x dx = x·e^x - ∫ e^x dx = x·e^x - e^x + C = e^x(x - 1) + C',
        hint: '分部积分法：选择 u 时优先考虑代数函数。'
    },
    {
        id: 11,
        chapter: 4,
        chapterName: '不定积分',
        difficulty: 'hard',
        question: '求不定积分：∫ 1/(1 + x²) dx',
        answer: '解：这是基本积分公式\n∫ 1/(1 + x²) dx = arctan x + C\n或者可以写作：arctan x + C',
        hint: '反三角函数的基本积分公式。'
    },

    // 第五章：定积分
    {
        id: 12,
        chapter: 5,
        chapterName: '定积分',
        difficulty: 'easy',
        question: '计算定积分：∫₀¹ x² dx',
        answer: '解：\n∫₀¹ x² dx = [x³/3]₀¹ = 1/3 - 0 = 1/3',
        hint: '使用牛顿-莱布尼茨公式。'
    },
    {
        id: 13,
        chapter: 5,
        chapterName: '定积分',
        difficulty: 'medium',
        question: '计算定积分：∫₀^(π/2) sin x dx',
        answer: '解：\n∫₀^(π/2) sin x dx = [-cos x]₀^(π/2)\n= -cos(π/2) - (-cos 0)\n= 0 - (-1) = 1',
        hint: '∫ sin x dx = -cos x + C'
    },
    {
        id: 14,
        chapter: 5,
        chapterName: '定积分',
        difficulty: 'hard',
        question: '利用定积分的对称性计算：∫₍₋₁₎¹ x³ dx',
        answer: '解：因为 f(x) = x³ 是奇函数\n在对称区间 [-1, 1] 上积分\n根据奇函数的性质：∫₍₋ₐ₎ᵃ f(x) dx = 0\n因此 ∫₍₋₁₎¹ x³ dx = 0',
        hint: '奇函数在对称区间上的积分为0。'
    },

    // 第六章：定积分的应用
    {
        id: 15,
        chapter: 6,
        chapterName: '定积分应用',
        difficulty: 'medium',
        question: '求由曲线 y = x² 与直线 y = 1 所围成的平面图形的面积',
        answer: '解：\n1) 求交点：x² = 1，得 x = ±1\n2) 面积 S = ∫₍₋₁₎¹ (1 - x²) dx\n   = [x - x³/3]₍₋₁₎¹\n   = (1 - 1/3) - (-1 + 1/3)\n   = 2/3 + 2/3 = 4/3',
        hint: '面积 = 上曲线 - 下曲线的积分。'
    },
    {
        id: 16,
        chapter: 6,
        chapterName: '定积分应用',
        difficulty: 'hard',
        question: '求曲线 y = √x (0 ≤ x ≤ 4) 绕 x 轴旋转一周所得旋转体的体积',
        answer: '解：使用旋转体体积公式 V = π∫ₐᵇ y² dx\nV = π∫₀⁴ (√x)² dx\n  = π∫₀⁴ x dx\n  = π[x²/2]₀⁴\n  = π · 16/2\n  = 8π',
        hint: '旋转体体积公式：V = π∫ₐᵇ [f(x)]² dx'
    }
];

// 当前显示的题目
let currentQuestions = [...questionsData];

// 页面初始化
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    renderQuestions();
    initFilters();
    initAIChat();
});

// 导航功能
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有active类
            navButtons.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // 添加active类
            btn.classList.add('active');
            const sectionId = btn.dataset.section + '-section';
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// 渲染题目
function renderQuestions() {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';

    if (currentQuestions.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: white; font-size: 18px;">没有找到符合条件的题目</div>';
        return;
    }

    currentQuestions.forEach(q => {
        const card = createQuestionCard(q);
        container.appendChild(card);
    });
}

// 创建题目卡片
function createQuestionCard(question) {
    const card = document.createElement('div');
    card.className = 'question-card';

    const difficultyText = {
        'easy': '基础',
        'medium': '中等',
        'hard': '困难'
    };

    card.innerHTML = `
        <div class="question-header">
            <div class="question-number">题目 ${question.id}</div>
            <div class="question-tags">
                <span class="tag ${question.difficulty}">${difficultyText[question.difficulty]}</span>
                <span class="tag" style="background: rgba(99, 102, 241, 0.1); color: #4f46e5;">${question.chapterName}</span>
            </div>
        </div>
        <div class="question-content">${question.question}</div>
        <div class="question-toggle" onclick="toggleAnswer(${question.id})">
            <span id="toggle-text-${question.id}">📖 查看答案</span>
            <span id="toggle-icon-${question.id}">▼</span>
        </div>
        <div class="question-answer" id="answer-${question.id}">
            <span class="answer-label">💡 详细解答：</span>
            <div class="answer-content">${question.answer.replace(/\n/g, '<br>')}</div>
            ${question.hint ? `<div style="margin-top: 12px; padding: 12px; background: rgba(6, 182, 212, 0.1); border-left: 3px solid #06b6d4; border-radius: 4px; color: #0e7490;">💭 提示：${question.hint}</div>` : ''}
        </div>
    `;

    return card;
}

// 切换答案显示
function toggleAnswer(questionId) {
    const answerDiv = document.getElementById(`answer-${questionId}`);
    const toggleText = document.getElementById(`toggle-text-${questionId}`);
    const toggleIcon = document.getElementById(`toggle-icon-${questionId}`);

    if (answerDiv.classList.contains('show')) {
        answerDiv.classList.remove('show');
        toggleText.textContent = '📖 查看答案';
        toggleIcon.textContent = '▼';
    } else {
        answerDiv.classList.add('show');
        toggleText.textContent = '📖 收起答案';
        toggleIcon.textContent = '▲';
    }
}

// 初始化筛选器
function initFilters() {
    const chapterFilter = document.getElementById('chapter-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');

    chapterFilter.addEventListener('change', applyFilters);
    difficultyFilter.addEventListener('change', applyFilters);
}

// 应用筛选
function applyFilters() {
    const chapterFilter = document.getElementById('chapter-filter').value;
    const difficultyFilter = document.getElementById('difficulty-filter').value;

    currentQuestions = questionsData.filter(q => {
        const chapterMatch = chapterFilter === 'all' || q.chapter == chapterFilter;
        const difficultyMatch = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
        return chapterMatch && difficultyMatch;
    });

    renderQuestions();
}

// 从知识点卡片快速筛选
function filterQuestions(chapter) {
    // 切换到题库标签
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === 'questions') {
            btn.classList.add('active');
        }
    });

    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('questions-section').classList.add('active');

    // 设置筛选器
    document.getElementById('chapter-filter').value = chapter;
    document.getElementById('difficulty-filter').value = 'all';

    applyFilters();

    // 滚动到题库区域
    document.getElementById('questions-section').scrollIntoView({ behavior: 'smooth' });
}

// AI聊天功能
function initAIChat() {
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');

    sendBtn.addEventListener('click', sendMessage);

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// 发送消息
async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (!message) return;

    // 添加用户消息到聊天框
    addMessageToChat('user', message);
    userInput.value = '';

    // 显示AI正在输入
    const typingId = showTypingIndicator();

    try {
        // 调用本地后端代理
        const response = await fetch(API_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message
            })
        });

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            const aiMessage = data.message;

            // 移除输入指示器
            removeTypingIndicator(typingId);

            // 添加AI回复
            addMessageToChat('ai', aiMessage);
        } else {
            throw new Error(data.error || '未知错误');
        }

    } catch (error) {
        console.error('API调用错误:', error);
        removeTypingIndicator(typingId);
        addMessageToChat('ai', '抱歉，我现在无法回答。请检查网络连接或稍后再试。错误信息：' + error.message);
    }
}

// 添加消息到聊天框
function addMessageToChat(role, content) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const avatar = role === 'user' ? '👤' : '🤖';

    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">${content.replace(/\n/g, '<br>')}</div>
    `;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 显示AI正在输入的指示器
function showTypingIndicator() {
    const chatBox = document.getElementById('chat-box');
    const typingDiv = document.createElement('div');
    const id = 'typing-' + Date.now();
    typingDiv.id = id;
    typingDiv.className = 'message ai';

    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        </div>
    `;

    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    return id;
}

// 移除输入指示器
function removeTypingIndicator(id) {
    const typingDiv = document.getElementById(id);
    if (typingDiv) {
        typingDiv.remove();
    }
}
