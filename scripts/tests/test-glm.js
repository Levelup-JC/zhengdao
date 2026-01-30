/**
 * GLM-4 API 连接测试
 */

const https = require('https');

const GLM_API_HOST = 'open.bigmodel.cn';
const API_KEY = 'feb6e591e2ef4b7194f43b7d6389f3d9.v6O38Nko2YSICgrV';

async function testGLMAPI() {
  console.log('🔍 GLM-4 API 连接测试\n');
  console.log('API Host:', GLM_API_HOST);
  console.log('API Key:', `${API_KEY.slice(0, 20)}...${API_KEY.slice(-10)}`);
  console.log('');

  console.log('📡 发送测试请求...\n');

  const requestBody = JSON.stringify({
    model: 'glm-4',
    messages: [
      {
        role: 'system',
        content: '你是一个专业的成长教练。'
      },
      {
        role: 'user',
        content: '请用一句话介绍你自己。'
      }
    ],
    temperature: 0.7,
    max_tokens: 100,
  });

  const options = {
    hostname: GLM_API_HOST,
    path: '/api/paas/v4/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Length': Buffer.byteLength(requestBody),
    },
  };

  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const req = https.request(options, (res) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      console.log(`⏱️  响应时间: ${responseTime}ms`);
      console.log(`📊 状态码: ${res.statusCode} ${res.statusMessage}\n`);

      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.error('❌ API 请求失败');
          console.error('错误详情:', data);

          if (res.statusCode === 401) {
            console.log('\n💡 可能原因: API Key 无效');
          } else if (res.statusCode === 429) {
            console.log('\n💡 可能原因: 请求过于频繁');
          }

          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }

        try {
          const result = JSON.parse(data);

          console.log('✅ API 连接成功！\n');
          console.log('📦 响应数据:');
          console.log('-'.repeat(50));
          console.log('ID:', result.id);
          console.log('Model:', result.model);
          console.log('Created:', result.created);
          console.log('-'.repeat(50));
          console.log('\n🤖 AI 回复:');
          console.log(result.choices[0].message.content);
          console.log('\n' + '='.repeat(50));
          console.log('✅ 测试通过！GLM-4 API 可以正常使用');
          console.log('='.repeat(50));

          resolve(result);
          process.exit(0);
        } catch (parseError) {
          console.error('❌ 解析响应失败:', parseError.message);
          console.log('原始响应:', data);
          reject(parseError);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ 请求失败:', error.message);
      console.log('\n💡 请检查:');
      console.log('   1. 网络连接是否正常');
      console.log('   2. API Key 是否正确');
      reject(error);
    });

    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('请求超时（30秒）'));
    });

    req.write(requestBody);
    req.end();
  });
}

// 运行测试
testGLMAPI().catch(err => {
  console.error('\n测试失败:', err.message);
  process.exit(1);
});
