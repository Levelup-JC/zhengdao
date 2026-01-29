import { NextRequest, NextResponse } from 'next/server';

/**
 * SBT 元数据 API
 * 返回指定等级的 SBT 元数据（符合 ERC-721 Metadata 标准）
 */

// 等级名称映射
const LEVEL_NAMES: Record<number, string> = {
  1: '炼精',
  2: '化气',
  3: '炼神',
  4: '还虚',
  5: '合道',
  6: '证道'
};

// 等级描述映射
const LEVEL_DESCRIPTIONS: Record<number, string> = {
  1: '炼精化气，筑基立命',
  2: '炼气化神，通达内外',
  3: '炼神还虚，明心见性',
  4: '还虚合道，天人合一',
  5: '合道归一，道法自然',
  6: '证道成真，超凡入圣'
};

// 等级颜色映射
const LEVEL_COLORS: Record<number, string> = {
  1: '#94a3b8', // 灰色
  2: '#22c55e', // 绿色
  3: '#3b82f6', // 蓝色
  4: '#a855f7', // 紫色
  5: '#f59e0b', // 金色
  6: '#ef4444'  // 红色
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ level: string }> }
) {
  try {
    const { level: levelParam } = await params;
    const level = parseInt(levelParam);

    // 验证等级是否有效
    if (isNaN(level) || level < 1 || level > 6) {
      return NextResponse.json(
        { error: 'Invalid level', message: 'Level must be between 1 and 6' },
        { status: 400 }
      );
    }

    // 获取请求的主机名，用于构建图片 URL
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';

    // 构建元数据
    const metadata = {
      name: `证道 SBT - ${LEVEL_NAMES[level]}`,
      description: `${LEVEL_DESCRIPTIONS[level]}（Level ${level}）`,
      image: `${protocol}://${host}/images/sbt/level-${level}-new.png`,
      external_url: `${protocol}://${host}/achievements`,
      attributes: [
        {
          trait_type: 'Level',
          value: level
        },
        {
          trait_type: 'Name',
          value: LEVEL_NAMES[level]
        },
        {
          trait_type: 'Description',
          value: LEVEL_DESCRIPTIONS[level]
        },
        {
          trait_type: 'Color',
          value: LEVEL_COLORS[level]
        },
        {
          trait_type: 'Type',
          value: 'Soulbound Token'
        },
        {
          trait_type: 'Chain',
          value: 'BNB Chain'
        },
        {
          display_type: 'boost_percentage',
          trait_type: 'Power',
          value: level * 15
        }
      ]
    };

    // 返回元数据，设置缓存头
    return NextResponse.json(metadata, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400', // 缓存 24 小时
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Error generating SBT metadata:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to generate metadata' },
      { status: 500 }
    );
  }
}
