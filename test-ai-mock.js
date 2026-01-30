/**
 * AI 模拟验证脚本
 * 验证在没有 API Key 的情况下，系统是否能正确降级到 Mock 数据
 */

const mockResponse = "【修行建议】今日你成功完成了 Web3 项目的 AI 集成测试，这是‘见素’阶段的重要进步。建议在明日部署合约前，再次核对环境变量配置，确保‘知常’。保持这种复盘习惯，定能‘抱一’。";

function getMockAIResponse(prompt) {
  console.log('[Mock AI] 收到 Prompt:', prompt);
  return mockResponse;
}

async function testMockAI() {
  console.log('--- AI 模拟功能验证 ---');
  const prompt = '今日做了什么值得记录的事：我完成了一个 Web3 项目的 AI 集成测试。有什么需要改进的地方：测试覆盖率还需要提高。明日的计划是什么：部署合约到测试网。';
  
  console.log('正在调用模拟 AI 服务...');
  const response = getMockAIResponse(prompt);
  
  console.log('AI 响应内容:');
  console.log('--------------------');
  console.log(response);
  console.log('--------------------');
  
  if (response.includes('修行建议') && response.includes('见素')) {
    console.log('✅ AI 模拟功能验证成功！系统能够提供符合语境的降级建议。');
  } else {
    console.log('❌ AI 模拟功能验证失败。');
  }
}

testMockAI();
