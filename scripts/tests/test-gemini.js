/**
 * Gemini API 连接测试
 */

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const API_KEY = 'AIzaSyApzq5Qdwci5N-F-NjtW3y1iAkc3--1jas';

async function testGeminiAPI() {
  console.log('🔍 Gemini API 连接测试\n');
  console.log('API URL:', GEMINI_API_URL);
  console.log('API Key:', `${API_KEY.slice(0, 10)}...${API_KEY.slice(-4)}`);
  console.log('');

  console.log('📡 发送测试请求...\n');

  try {
    const startTime = Date.now();

    const url = `${GEMINI_API_URL}?key=${API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
      signal: AbortSignal.timeout(30000), // 30秒超时
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(`⏱️  响应时间: ${responseTime}ms`);
    console.log(`📊 状态码: ${response.status} ${response.statusText}\n`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API 请求失败');
      console.error('错误详情:', errorText);

      // 分析常见错误
      if (response.status === 401 || response.status === 403) {
        console.log('\n💡 可能原因: API Key 无效');
        console.log('   请检查您的 API Key 是否正确');
      } else if (response.status === 429) {
        console.log('\n💡 可能原因: 请求过于频繁或配额不足');
        console.log('   请稍后重试或检查账户配额');
      }

      process.exit(1);
    }

    const data = await response.json();

    console.log('✅ API 连接成功！\n');
    console.log('📦 响应数据:');
    console.log('-'.repeat(50));
    console.log('Candidates:', data.candidates.length);
    if (data.candidates && data.candidates[0]) {
      console.log('Finish Reason:', data.candidates[0].finishReason);
    }
    console.log('-'.repeat(50));
    console.log('\n🤖 AI 回复:');
    console.log(data.candidates[0].content.parts[0].text);
    console.log('\n' + '='.repeat(50));
    console.log('✅ 测试通过！Gemini API 可以正常使用');
    console.log('='.repeat(50));

    process.exit(0);
  } catch (error) {
    console.error('❌ 测试失败:', error.message);

    if (error.name === 'AbortError') {
      console.log('\n💡 错误: 请求超时（30秒）');
      console.log('   请检查网络连接或稍后重试');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 错误: 无法连接到服务器');
      console.log('   请检查网络连接');
    } else {
      console.log('\n💡 请检查上面的错误信息');
    }

    process.exit(1);
  }
}

// 运行测试
testGeminiAPI();
