'use client';

/**
 * Coming Soon功能展示页面
 *
 * 展示即将推出的4个功能
 */

import { ComingSoonShowcase } from '@/components/ComingSoonShowcase';
import { ChainSwitcher } from '@/components/achievement/ChainSwitcher';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ComingSoonPage() {
  const router = useRouter();
  const [currentChain, setCurrentChain] = useState<'bnb' | 'solana'>('bnb');

  return (
    <main className="coming-soon-page">
      {/* 页面头部 */}
      <div className="page-header">
        <button
          onClick={() => router.push('/check-in')}
          className="back-button"
        >
          ← 返回打卡
        </button>

        <div className="header-content">
          <h1 className="page-title">
            证道 · 即将推出
          </h1>
          <p className="page-subtitle">
            ZhengDao · Coming Soon Features
          </p>
        </div>

        {/* 链切换器（保持一致性） */}
        <div className="chain-switcher-wrapper">
          <ChainSwitcher
            currentChain={currentChain}
            onChainChange={setCurrentChain}
          />
        </div>
      </div>

      {/* Coming Soon展示 */}
      <ComingSoonShowcase />

      {/* 额外信息 */}
      <section className="info-section">
        <div className="info-card">
          <h2>功能开发计划</h2>
          <p>
            我们正在积极开发这些功能，确保它们与现有的双链SBT系统完美集成。
            每个功能都将支持BNB Chain和Solana两条链。
          </p>
        </div>

        <div className="info-card">
          <h2>参与讨论</h2>
          <p>
            欢迎在社区讨论这些即将推出的功能，您的反馈对我们非常重要！
            我们会根据社区优先级调整开发计划。
          </p>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="page-footer">
        <p>修身 · 齐家 · 证道</p>
        <p className="footer-text">
          © 2026 证道项目 | Powered by BNB Chain & Solana
        </p>
      </footer>

      <style jsx>{`
        .coming-soon-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #FFFEF2 0%, #FFF9E6 100%);
        }

        .back-button {
          padding: 0.5rem 1rem;
          background: white;
          border: 2px solid #1a1a1a;
          color: #1a1a1a;
          font-family: 'Georgia', serif;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-right: 1rem;
        }

        .back-button:hover {
          background: #1a1a1a;
          color: white;
        }

        .page-header {
          background: white;
          border-bottom: 2px solid #1a1a1a;
          padding: 2rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .header-content {
          flex: 1;
        }

        .page-title {
          font-family: 'Georgia', serif;
          font-size: 2rem;
          font-weight: bold;
          color: #1a1a1a;
          margin: 0 0 0.5rem 0;
        }

        .page-subtitle {
          font-family: 'Georgia', serif;
          font-size: 1rem;
          color: #666;
          margin: 0;
        }

        .chain-switcher-wrapper {
          display: flex;
          align-items: center;
        }

        .info-section {
          max-width: 1200px;
          margin: 3rem auto;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .info-card {
          background: white;
          border: 2px solid #e0e0e0;
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .info-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .info-card h2 {
          font-family: 'Georgia', serif;
          font-size: 1.5rem;
          font-weight: bold;
          color: #1a1a1a;
          margin-bottom: 1rem;
        }

        .info-card p {
          font-family: 'Georgia', serif;
          font-size: 1rem;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        .page-footer {
          background: #1a1a1a;
          color: white;
          text-align: center;
          padding: 3rem 1.5rem;
          margin-top: 4rem;
        }

        .page-footer p {
          font-family: 'Georgia', serif;
          font-size: 1.25rem;
          margin: 0.5rem 0;
        }

        .footer-text {
          font-size: 0.875rem !important;
          color: #999 !important;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: stretch;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .chain-switcher-wrapper {
            justify-content: center;
          }

          .info-section {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
