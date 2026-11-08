/**
 * AI 反思处理 API
 * 接收用户反思内容，调用DeepSeek API进行结构化提取
 */

import { NextRequest, NextResponse } from 'next/server';
import { processReflectionWithDeepSeek } from '@/lib/deepseek';

/**
 * POST 请求处理
 * 处理反思内容并返回结构化数据
 */
export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json();
    const { content } = body;

    // 验证参数
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { success: false, error: '缺少必需参数: content' },
        { status: 400 }
      );
    }

    // 验证内容长度（10-5000字）
    if (content.length < 10) {
      return NextResponse.json(
        { success: false, error: '反思内容太短，至少10个字' },
        { status: 400 }
      );
    }

    if (content.length > 5000) {
      return NextResponse.json(
        { success: false, error: '反思内容太长，最多5000个字' },
        { status: 400 }
      );
    }

    // 调用DeepSeek API进行处理
    console.log('[API] 开始处理反思内容, 长度:', content.length);
    const startTime = Date.now();

    const structuredData = await processReflectionWithDeepSeek(content);

    const duration = Date.now() - startTime;
    console.log(`[API] AI处理完成, 耗时: ${duration}ms`);

    // 返回结构化数据
    return NextResponse.json({
      success: true,
      data: structuredData,
      duration,
    });
  } catch (error) {
    console.error('[API] 反思处理失败:', error);

    // 返回错误信息
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '处理失败，请重试',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS 请求处理（CORS 预检）
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
