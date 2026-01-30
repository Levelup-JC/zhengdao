/**
 * DeepSeek API 连接测试
 */

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

// 从环境变量或命令行参数获取 API Key
const API_KEY = process.env.DEEPSEEK_API_KEY || process.argv[2];

async function testDeepSeekAPI() {
  console.log('🔍 DeepSeek API 连接测试\n');
  console.log('API URL:', DEEPSEEK_API_URL);
  console.log('Model:', DEEPSEEK_MODEL);
  console.log('API Key:', API_KEY ? `${API_KEY.slice(0, 8)}...${API_KEY.slice(-4)}` : '❌ 未配置');
  console.log('');

  if (!API_KEY) {
    console.error('❌ 错误: 未找到 DEEPSEEK_API_KEY');
    console.log('\n请通过以下方式提供 API Key:');
    console.log('1. 设置环境变量: export DEEPSEEK_API_KEY=your_key');
    console.log('2. 命令行参数: node test-deepseek.js your_key');
    console.log('3. .env.local 文件中添加: DEEPSEEK_API_KEY=your_key\n');
    process.exit(1);
  }

  console.log('📡 发送测试请求...\n');

  const testPrompt = '请用一句话介绍你自己。';

  try {
    const startTime = Date.now();

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          {
            role: 'system',
            content: '你是一个专业的成长教练。',
          },
          {
            role: 'user',
            content: testPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 100,
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
      if (response.status === 401) {
        console.log('\n💡 可能原因: API Key 无效或过期');
        console.log('   请检查您的 API Key 是否正确');
      } else if (response.status === 429) {
        console.log('\n💡 可能原因: 请求过于频繁或配额不足');
        console.log('   请稍后重试或检查账户余额');
      } else if (response.status === 500) {
        console.log('\n💡 可能原因: DeepSeek 服务器错误');
        console.log('   请稍后重试');
      }

      process.exit(1);
    }

    const data = await response.json();

    console.log('✅ API 连接成功！\n');
    console.log('📦 响应数据:');
    console.log('-'.repeat(50));
    console.log('ID:', data.id);
    console.log('Model:', data.model);
    console.log('Choices:', data.choices.length);
    console.log('-'.repeat(50));
    console.log('\n🤖 AI 回复:');
    console.log(data.choices[0].message.content);
    console.log('\n' + '='.repeat(50));
    console.log('✅ 测试通过！DeepSeek API 可以正常使用');
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
testDeepSeekAPI();
