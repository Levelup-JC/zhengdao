import { NextRequest, NextResponse } from 'next/server';
import { callAIService } from '@/lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: '缺少 prompt 参数' },
        { status: 400 }
      );
    }

    console.log('[API] 测试 AI 服务...');
    const startTime = Date.now();

    const result = await callAIService(prompt, 100);

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`[API] AI 服务调用成功，耗时: ${duration}ms`);

    return NextResponse.json({
      result,
      provider: result.provider,
      model: result.model,
      duration,
    });
  } catch (error: any) {
    console.error('[API] AI 服务调用失败:', error);

    return NextResponse.json(
      {
        error: error.message || 'AI 服务调用失败',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
