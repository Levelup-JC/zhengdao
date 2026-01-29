'use client';

import { useEffect, useState } from 'react';

interface Metadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{ trait_type: string; value: any }>;
}

export default function TestNFTImagesPage() {
  const [metadata, setMetadata] = useState<{ [key: number]: Metadata }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllMetadata = async () => {
      try {
        const results: { [key: number]: Metadata } = {};

        for (let level = 1; level <= 6; level++) {
          const response = await fetch(`/api/sbt-metadata/${level}`);
          if (response.ok) {
            const data = await response.json();
            results[level] = data;
          }
        }

        setMetadata(results);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metadata');
        setLoading(false);
      }
    };

    fetchAllMetadata();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">⏳</div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>❌ 错误: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            证道 SBT - 图片测试页面
          </h1>
          <p className="text-gray-400">
            验证所有等级的 SBT 图片是否正常显示
          </p>
        </div>

        {/* NFT 卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(metadata).map(([level, data]) => (
            <div
              key={level}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* 图片 */}
              <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23333" width="400" height="400"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="48" dy="205" dx="90"%3E图片加载失败%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Level {level}
                </div>
              </div>

              {/* 信息 */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {data.name}
                </h2>
                <p className="text-gray-400 mb-4">
                  {data.description}
                </p>

                {/* 属性 */}
                <div className="space-y-2">
                  {data.attributes.slice(0, 3).map((attr, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-700 bg-opacity-50 rounded-lg px-3 py-2"
                    >
                      <span className="text-gray-400 text-sm">
                        {attr.trait_type}
                      </span>
                      <span className="text-white font-semibold text-sm">
                        {attr.value.toString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 查看元数据按钮 */}
                <button
                  onClick={() => {
                    const metadataUrl = `/api/sbt-metadata/${level}`;
                    navigator.clipboard.writeText(
                      window.location.origin + metadataUrl
                    );
                    alert('元数据 URL 已复制到剪贴板！');
                  }}
                  className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  复制元数据 URL
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* API 测试说明 */}
        <div className="mt-12 bg-gray-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            🔧 API 测试
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 mb-2">测试命令：</p>
              <code className="block bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                curl http://localhost:3000/api/sbt-metadata/1
              </code>
            </div>
            <div>
              <p className="text-gray-400 mb-2">图片访问：</p>
              <code className="block bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto break-all">
                http://localhost:3000/images/sbt/level-1-new.png
              </code>
            </div>
          </div>
        </div>

        {/* 返回按钮 */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
          >
            ← 返回首页
          </a>
        </div>
      </div>
    </div>
  );
}
