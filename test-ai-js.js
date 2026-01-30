const https = require('https');
const dotenv = require('dotenv');
const path = require('path');

// 加载环境变量
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function callGLMAPI(prompt, maxTokens = 500) {
  const apiKey = process.env.GLM_API_KEY;
  if (!apiKey) throw new Error('GLM_API_KEY 未配置');

  const requestBody = JSON.stringify({
    model: 'glm-4',
    messages: [
      { role: 'system', content: '你是一个专业的成长教练，善于从日常反思中提炼洞察，帮助用户复盘和改进。' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
    max_tokens: maxTokens,
  });

  const options = {
    hostname: 'open.bigmodel.cn',
    path: '/api/paas/v4/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Content-Length': Buffer.byteLength(requestBody),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`GLM API 请求失败: ${data}`));
          return;
        }
        try {
          const result = JSON.parse(data);
          resolve(result.choices[0].message.content);
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

async function test() {
  console.log('--- AI 功能验证 (JS) ---');
  const apiKey = process.env.GLM_API_KEY;
  console.log('GLM_API_KEY 是否存在:', !!apiKey);

  if (!apiKey) {
    console.log('跳过测试：未配置 API Key');
    return;
  }

  const prompt = '今日做了什么值得记录的事：我完成了一个 Web3 项目的 AI 集成测试。有什么需要改进的地方：测试覆盖率还需要提高。明日的计划是什么：部署合约到测试网。请基于以上内容给我一段简短的修行复盘建议。';
  
  try {
    console.log('正在调用 GLM-4 API...');
    const response = await callGLMAPI(prompt);
    console.log('AI 响应内容:');
    console.log('--------------------');
    console.log(response);
    console.log('--------------------');
    console.log('✅ AI 功能验证成功！');
  } catch (e) {
    console.error('❌ AI 功能验证失败:', e.message);
  }
}

test();
