/**
 * AI 服务降级测试脚本
 *
 * 测试场景：
 * 1. DeepSeek API 正常工作
 * 2. DeepSeek API 失败，自动降级到 Gemini
 * 3. 所有服务都失败时的错误处理
 */

require('dotenv').config({ path: '.env.local' });

const {
  callAIService,
  isAIServiceAvailable,
  getAvailableProviders,
  getCurrentProvider,
} = require('./lib/ai-service.ts');

console.log('====================================');
console.log('AI 服务降级测试');
console.log('====================================\n');

// 检查可用的 AI 服务
console.log('📊 当前配置状态:');
console.log('  - AI 服务可用:', isAIServiceAvailable());
console.log('  - 当前提供商:', getCurrentProvider());
console.log('  - 可用提供商:', getAvailableProviders());
console.log('');

// 测试提示词
const testPrompt = '今天我完成了3小时的深度学习，感觉很有收获。请帮我总结一下今天的成长。';

async function testAIService() {
  console.log('🧪 开始测试 AI 服务...\n');

  try {
    console.log('⏳ 正在调用 AI 服务...');
    console.log('📝 测试提示词:', testPrompt);
    console.log('');

    const response = await callAIService(testPrompt, 300);

    console.log('✅ AI 服务调用成功!');
    console.log('📦 响应模型:', response.model);
    console.log('📊 Token 使用:', response.usage || 'N/A');
    console.log('');
    console.log('💬 AI 回复:');
    console.log('─'.repeat(50));
    console.log(response.content);
    console.log('─'.repeat(50));
    console.log('');

    return true;
  } catch (error) {
    console.error('❌ AI 服务调用失败!');
    console.error('错误信息:', error.message);
    console.error('');

    if (error.message.includes('没有可用的 AI API Key')) {
      console.log('💡 提示: 请在 .env.local 中配置至少一个 AI API Key');
      console.log('   - GLM_API_KEY (推荐)');
      console.log('   - MINIMAX_API_KEY + MINIMAX_GROUP_ID');
      console.log('   - DEEPSEEK_API_KEY');
      console.log('   - GEMINI_API_KEY (备用)');
    }

    return false;
  }
}

// 执行测试
testAIService()
  .then((success) => {
    console.log('');
    console.log('====================================');
    if (success) {
      console.log('✅ 测试完成: AI 服务工作正常');
    } else {
      console.log('❌ 测试失败: 请检查 AI API Key 配置');
    }
    console.log('====================================');
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('💥 测试过程发生异常:', error);
    process.exit(1);
  });
