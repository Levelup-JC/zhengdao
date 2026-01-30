/**
 * Gemini API 连接测试 (使用 https 模块)
 */

const https = require('https');

const GEMINI_API_HOST = 'generativelanguage.googleapis.com';
const API_KEY = 'AIzaSyApzq5Qdwci5N-F-NjtW3y1iAkc3--1jas';

async function testGeminiAPI() {
  console.log('🔍 Gemini API 连接测试\n');
  console.log('API Host:', GEMINI_API_HOST);
  console.log('API Key:', `${API_KEY.slice(0, 10)}...${API_KEY.slice(-4)}`);
  console.log('');

  console.log('📡 发送测试请求...\n');

  const requestBody = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: '请用一句话介绍你自己。'
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 100,
    },
  });

  const options = {
    hostname: GEMINI_API_HOST,
    path: `/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

          if (res.statusCode === 401 || res.statusCode === 403) {
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

          if (result.candidates && result.candidates[0]) {
            console.log('Finish Reason:', result.candidates[0].finishReason);
            console.log('-'.repeat(50));
            console.log('\n🤖 AI 回复:');
            console.log(result.candidates[0].content.parts[0].text);
          }

          console.log('\n' + '='.repeat(50));
          console.log('✅ 测试通过！Gemini API 可以正常使用');
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
      console.log('   3. 防火墙是否阻止了请求');
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
testGeminiAPI().catch(err => {
  console.error('\n测试失败:', err.message);
  process.exit(1);
});
