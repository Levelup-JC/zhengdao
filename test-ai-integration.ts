import { generateAIResponse, isAIServiceAvailable, getCurrentProvider } from './lib/ai-service';
import * as dotenv from 'dotenv';
import path from 'path';

// 加载环境变量
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testAI() {
  console.log('--- AI 功能验证 ---');
  console.log('AI 服务是否可用:', isAIServiceAvailable());
  console.log('当前 AI 提供商:', getCurrentProvider());

  if (!isAIServiceAvailable()) {
    console.log('跳过 AI 测试：未配置 API Key');
    return;
  }

  const testPrompt = '今日做了什么值得记录的事：我完成了一个 Web3 项目的 AI 集成测试。有什么需要改进的地方：测试覆盖率还需要提高。明日的计划是什么：部署合约到测试网。请基于以上内容给我一段简短的修行复盘建议。';

  try {
    console.log('正在调用 AI 生成复盘建议...');
    const response = await generateAIResponse(testPrompt);
    console.log('AI 响应内容:');
    console.log('--------------------');
    console.log(response);
    console.log('--------------------');
    console.log('AI 功能验证成功！');
  } catch (error) {
    console.error('AI 功能验证失败:', error);
  }
}

testAI();
