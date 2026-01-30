'use client';

/**
 * 参赛信息展示组件
 * 用于引导用户为「证道」项目投票
 */

import { motion } from 'framer-motion';

export function CompetitionInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mt-8 bg-white border-2 border-black/20 p-8 text-center relative overflow-hidden"
      style={{ borderRadius: 0 }}
    >
      {/* 装饰性背景 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/20 to-transparent" />

      {/* 标题 */}
      <h2
        className="text-3xl font-bold text-black mb-3"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        支持「证道」项目
      </h2>

      {/* 副标题 */}
      <p
        className="text-lg text-black/70 mb-8 max-w-2xl mx-auto"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        如果您认可我们的理念，请为我们投上宝贵的一票。
      </p>

      {/* 主要按钮 - 立即投票 */}
      <a
        href="https://snapshot.box/#/s:bnbdev-dao.eth/proposal/0xb48bf6be495602d66663a78fb95db9f22b405680ca896a8597b68356b5645416"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-4 bg-black text-white font-bold text-lg hover:bg-black/90 transition-colors mb-6"
        style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
      >
        立即投票
      </a>

      {/* 次要链接 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="https://x.com/blockphd7/status/2016875033600413996?s=20"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/60 hover:text-black text-sm flex items-center gap-2 transition-colors"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          项目理念介绍
        </a>

        <span className="hidden sm:inline text-black/20">|</span>

        <a
          href="https://x.com/blockphd7/status/2015605299844194809?s=20"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/60 hover:text-black text-sm flex items-center gap-2 transition-colors"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          最新进展更新
        </a>
      </div>

      {/* 底部装饰 */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
    </motion.div>
  );
}
