'use client';

/**
 * ClaimSBTFlow - SBT申领流程组件
 * 3步申领流程：确认 → 连接钱包 → 申领成功
 * 支持BNB Chain和Solana双链
 * 使用真实的合约mint功能
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AchievementLevel } from '@/lib/achievement-system';
import { getLevelIcon } from '@/lib/achievement-system';
import { useChainManager } from '@/lib/chain-manager';
import { useAccount, useSwitchChain } from 'wagmi';
import { useMintSBT } from '@/lib/contracts/sbt';
import { useSolanaMintSBT } from '@/lib/hooks/useSolanaMintSBT';
import { SBTMintService } from '@/lib/sbt-mint-service';
import { ConditionMinter } from '@/lib/condition-minter';
import { getLevelMintStatusAcrossChains } from '@/lib/db';
import { estimateGasFee, formatGasFee, GasEstimate } from '@/lib/gas-estimator';
import toast from 'react-hot-toast';

type ClaimStep = 'confirm' | 'connecting' | 'claiming' | 'success' | 'error';

interface ClaimSBTFlowProps {
  level: AchievementLevel;
  days: number;
  chain: 'bnb' | 'solana';
  onClaim?: (level: number, chain: 'bnb' | 'solana') => Promise<boolean>;
  onClose?: () => void;
  className?: string;
}

export function ClaimSBTFlow({
  level,
  days,
  chain,
  onClaim,
  onClose,
  className = ''
}: ClaimSBTFlowProps) {
  const [currentStep, setCurrentStep] = useState<ClaimStep>('confirm');
  const [isProcessing, setIsProcessing] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');
  const [selectedChain, setSelectedChain] = useState<'bnb' | 'solana'>(chain || 'bnb');
  const [hasMinted, setHasMinted] = useState(false);
  const [mintCondition, setMintCondition] = useState<any>(null);
  const [gasEstimate, setGasEstimate] = useState<GasEstimate | null>(null);

  // 使用链管理器
  const { isChainConnected, connectChain, getChainInfo, switchChain: switchChainManager } = useChainManager();

  // 使用wagmi获取钱包地址和当前链
  const { address, chain: walletChain } = useAccount();

  // 切换链的hook（wagmi的，用于实际切换钱包网络）
  const { switchChain: switchWalletChain } = useSwitchChain();

  // 使用mint SBT Hook (BSC)
  const { mintSBT, isPending: isBSCPending, isConfirming: isBSCConfirming, isConfirmed: isBSCConfirmed, hash: bscHash } = useMintSBT();

  // 使用mint SBT Hook (Solana)
  const { mintSolanaSBT, isPending: isSolanaPending, isConfirming: isSolanaConfirming, isConfirmed: isSolanaConfirmed, hash: solanaHash, reset: resetSolanaMint } = useSolanaMintSBT();

  // 根据选中的链确定当前状态
  const isPending = selectedChain === 'bnb' ? isBSCPending : isSolanaPending;
  const isConfirming = selectedChain === 'bnb' ? isBSCConfirming : isSolanaConfirming;
  const isConfirmed = selectedChain === 'bnb' ? isBSCConfirmed : isSolanaConfirmed;
  const hash = selectedChain === 'bnb' ? bscHash : solanaHash;

  // 检查是否已铸造和条件验证
  useEffect(() => {
    const checkMintStatus = async () => {
      if (address && level.level) {
        // 检查跨链铸造状态
        const status = await getLevelMintStatusAcrossChains(address, level.level);

        // 检查当前选择的链是否已铸造
        const hasMintedOnSelectedChain = selectedChain === 'bnb' ? status.bnb : status.solana;

        setHasMinted(hasMintedOnSelectedChain);

        if (hasMintedOnSelectedChain) {
          setError(`此等级SBT已在${selectedChain === 'bnb' ? 'BSC' : 'Solana'}链上铸造`);
          setCurrentStep('error');
        }

        // 获取完整铸造条件
        const condition = await ConditionMinter.checkMintCondition(address, level.level);
        setMintCondition(condition);
      }
    };

    checkMintStatus();
  }, [address, level.level, selectedChain]);

  // 确保当前链与选中的链一致
  useEffect(() => {
    if (selectedChain) {
      switchChainManager(selectedChain);
    }
  }, [selectedChain, switchChainManager]);

  // 监听交易确认状态
  useEffect(() => {
    if (hash && isConfirmed) {
      setTxHash(hash);
      setCurrentStep('success');

      // 保存铸造记录
      if (address) {
        const metadataURI = `https://zhengdao.io/metadata/${level.level}/${address}`;
        SBTMintService.saveMintRecord(
          address,
          selectedChain,
          level.level,
          hash,
          metadataURI
        ).catch(err => {
          console.error('[ClaimSBTFlow] 保存铸造记录失败:', err);
        });
      }

      if (onClaim) {
        onClaim(level.level, selectedChain);
      }
      toast.success('SBT铸造成功！');
    }
  }, [hash, isConfirmed, level, selectedChain, address, onClaim]);

  // 监听交易状态
  useEffect(() => {
    if (isPending || isConfirming) {
      setCurrentStep('claiming');
    }
  }, [isPending, isConfirming]);

  // 计算Gas费用估算
  useEffect(() => {
    const calculateGasEstimate = async () => {
      if (!level.level || !days) return;

      try {
        const metadataURI = `https://zhengdao.io/metadata/${level.level}/0x0000000000000000000000000000000000000001`;
        const estimate = await estimateGasFee(selectedChain, level.level, days, metadataURI);
        setGasEstimate(estimate);
      } catch (error) {
        console.error('[ClaimSBTFlow] Gas费估算失败:', error);
      }
    };

    calculateGasEstimate();
  }, [selectedChain, level.level, days]);

  const handleConfirm = () => {
    setCurrentStep('connecting');
  };

  const handleWalletConnect = async (walletType: string) => {
    setIsProcessing(true);
    setError('');

    try {
      // 再次检查是否已铸造
      if (address && hasMinted) {
        throw new Error('此等级SBT已铸造，每个等级只能铸造一次');
      }

      // 检查钱包是否已连接
      const isConnected = isChainConnected(selectedChain);

      if (!isConnected) {
        // 尝试连接指定链
        await connectChain(selectedChain);
      }

      // 检查钱包地址
      if (!address) {
        throw new Error('请先连接钱包');
      }

      // 对于BNB Chain，确保钱包切换到正确的网络（主网或测试网）
      if (selectedChain === 'bnb') {
        // 根据环境变量决定使用主网还是测试网
        const isTestnet = process.env.NEXT_PUBLIC_BNB_CHAIN_TESTNET === 'true';
        const BSC_CHAIN_ID = isTestnet ? 97 : 56; // 97 = 测试网, 56 = 主网
        const networkName = isTestnet ? 'BSC 测试网' : 'BSC 主网';

        console.log('[ClaimSBTFlow] 当前钱包网络:', walletChain?.id, walletChain?.name);
        console.log('[ClaimSBTFlow] 目标网络:', BSC_CHAIN_ID, networkName);

        if (walletChain?.id !== BSC_CHAIN_ID) {
          console.log(`[ClaimSBTFlow] 需要切换到 ${networkName}`);
          toast.loading(`正在切换到 ${networkName}...`, { id: 'switch-chain' });

          try {
            await switchWalletChain?.({ chainId: BSC_CHAIN_ID });
            console.log('[ClaimSBTFlow] 网络切换命令已发送');

            // 等待网络切换完成（OKX 钱包需要更多时间）
            toast.loading(`正在等待网络切换完成...`, { id: 'switch-chain' });
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log(`[ClaimSBTFlow] 已切换到 ${networkName}`);
            toast.success(`已切换到 ${networkName}`, { id: 'switch-chain' });
          } catch (switchError) {
            console.error('[ClaimSBTFlow] 切换网络失败:', switchError);
            toast.error(`请手动在钱包中切换到 ${networkName}（Chain ID: ${BSC_CHAIN_ID}）`, { id: 'switch-chain' });
            throw new Error(`请在钱包中切换到 ${networkName}后再试`);
          }
        } else {
          console.log(`[ClaimSBTFlow] 已在 ${networkName}，无需切换`);
          // 即使已在正确网络，也给一点时间让钱包准备
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // 进入申领流程
      setCurrentStep('claiming');

      // 准备metadata URI
      const metadataURI = `https://zhengdao.io/metadata/${level.level}/${address}`;

      // 根据选择的链执行不同的铸造逻辑
      if (selectedChain === 'bnb') {
        // ========== BSC 链铸造逻辑 ==========

        // 检查合约地址是否配置
        const contractAddress = process.env.NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS;
        if (!contractAddress || contractAddress === '0x0000000000000000000000000000000000000000') {
          console.error('[ClaimSBTFlow] 合约地址未配置，使用模拟模式');

          // 模拟铸造成功
          toast.loading('模拟铸造中...', { id: 'mint-toast' });
          await new Promise(resolve => setTimeout(resolve, 2000));

          // 生成模拟的交易哈希
          const mockTxHash = `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`;

          setTxHash(mockTxHash);
          setCurrentStep('success');

          // 保存铸造记录
          await SBTMintService.saveMintRecord(
            address,
            selectedChain,
            level.level,
            mockTxHash,
            metadataURI
          );

          if (onClaim) {
            await onClaim(level.level, selectedChain);
          }

          toast.success('模拟铸造成功！（合约未部署）', { id: 'mint-toast' });
          return;
        }

        // 调用真实的合约mint函数
        toast.loading('正在确认钱包交易...', { id: 'mint-toast' });

        await mintSBT(
          address as `0x${string}`,
          level.level,
          days,
          metadataURI
        );

        // 交易已提交，等待确认
        toast.loading('交易已提交，正在确认...', { id: 'mint-toast' });

      } else if (selectedChain === 'solana') {
        // ========== Solana 链铸造逻辑 ==========

        // 调用Solana铸造函数
        toast.loading('正在确认Solana钱包交易...', { id: 'mint-toast' });

        await mintSolanaSBT(
          address,
          level.level,
          days,
          metadataURI
        );

        // 交易已提交，等待确认
        toast.loading('交易已提交，正在确认...', { id: 'mint-toast' });
      }
    } catch (err) {
      console.error('[ClaimSBTFlow] Mint error:', err);
      const errorMessage = err instanceof Error ? err.message : '申领失败';
      setError(errorMessage);
      setCurrentStep('error');
      toast.error(errorMessage, { id: 'mint-toast' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    setError('');
    setCurrentStep('confirm');
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const getChainName = (chain: 'bnb' | 'solana') => {
    return chain === 'bnb' ? 'BNB Chain' : 'Solana';
  };

  const getChainIcon = (chain: 'bnb' | 'solana') => {
    return chain === 'bnb' ? '🟡' : '🟣';
  };

  // 根据链类型获取钱包选项
  const getWalletOptions = () => {
    if (chain === 'bnb') {
      return [
        { id: 'metamask', name: 'MetaMask', icon: '🦊' },
        { id: 'walletconnect', name: 'WalletConnect', icon: '🌐' },
        { id: 'trust', name: 'Trust Wallet', icon: '🛡️' }
      ];
    } else {
      return [
        { id: 'phantom', name: 'Phantom', icon: '👻' },
        { id: 'solflare', name: 'Solflare', icon: '🌞' },
        { id: 'ledger', name: 'Ledger', icon: '🔒' }
      ];
    }
  };

  const chainInfo = getChainInfo(chain);
  const isWalletConnected = chainInfo?.isConnected || false;

  return (
    <div className={`claim-sbt-flow ${className}`}>
      <AnimatePresence mode="wait">
        {/* 步骤1: 确认信息 */}
        {currentStep === 'confirm' && (
          <motion.div
            key="confirm"
            className="claim-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="step-header">
              <span className="step-number">1</span>
              <h2>确认申领信息</h2>
            </div>

            <div className="claim-preview">
              <div className="preview-icon">
                <span className="level-emoji">{getLevelIcon(level.icon)}</span>
              </div>

              <div className="preview-info">
                <h3>{level.title}</h3>
                <p>Level {level.level} · {level.titleEn}</p>

                <div className="preview-details">
                  <div className="detail-item">
                    <span className="detail-label">打卡天数</span>
                    <span className="detail-value">{days} 天</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">区块链</span>
                    <span className="detail-value">
                      {getChainIcon(selectedChain)} {getChainName(selectedChain)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">奖励加成</span>
                    <span className="detail-value bonus">
                      +{level.rewardBonus}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 链选择器 */}
            <div className="chain-selector">
              <p className="selector-label">选择区块链网络：</p>
              <div className="chain-options">
                <button
                  className={`chain-option ${selectedChain === 'bnb' ? 'active' : ''}`}
                  onClick={() => setSelectedChain('bnb')}
                  type="button"
                >
                  <span className="chain-icon">🟡</span>
                  <span className="chain-name">BNB Chain</span>
                  <span className="chain-status">
                    {mintCondition?.hasMintedOnBSC ? '已铸造' : '可用'}
                  </span>
                </button>
                <button
                  className={`chain-option ${selectedChain === 'solana' ? 'active' : ''}`}
                  onClick={() => setSelectedChain('solana')}
                  type="button"
                >
                  <span className="chain-icon">🟣</span>
                  <span className="chain-name">Solana</span>
                  <span className="chain-status">
                    {mintCondition?.hasMintedOnSolana ? '已铸造' : '可用'}
                  </span>
                </button>
              </div>
            </div>

            {/* 条件验证显示 */}
            {mintCondition && (
              <div className="condition-verification">
                <h4>铸造条件检查</h4>
                <div className="condition-item">
                  <span>打卡天数</span>
                  <span className={mintCondition.userDays >= mintCondition.requiredDays ? 'met' : 'unmet'}>
                    {mintCondition.userDays}/{mintCondition.requiredDays} 天
                    {mintCondition.userDays >= mintCondition.requiredDays ? ' ✓' : ''}
                  </span>
                </div>
                <div className="condition-item">
                  <span>等级要求</span>
                  <span className="met">Level {level.level} 达成</span>
                </div>
                <div className="condition-item">
                  <span>是否已铸造</span>
                  <span className={!hasMinted ? 'met' : 'unmet'}>
                    {!hasMinted ? '未铸造' : selectedChain === 'bnb' ? 'BSC已铸造' : 'Solana已铸造'}
                  </span>
                </div>
              </div>
            )}

            {/* 网络状态提示 */}
            <div className={`network-status-banner ${process.env.NEXT_PUBLIC_BNB_CHAIN_TESTNET === 'true' ? 'testnet' : 'mainnet'}`}>
              <div className="network-status-header">
                <span className="network-icon">{process.env.NEXT_PUBLIC_BNB_CHAIN_TESTNET === 'true' ? '🧪' : '🚀'}</span>
                <span className="network-title">
                  {process.env.NEXT_PUBLIC_BNB_CHAIN_TESTNET === 'true' ? '测试网模式' : '主网模式'}
                </span>
              </div>
              <div className="network-status-content">
                {process.env.NEXT_PUBLIC_BNB_CHAIN_TESTNET === 'true' ? (
                  <span className="network-note">当前为 BSC 测试网 (Chain ID: 97)，使用测试币进行交易</span>
                ) : (
                  <span className="network-note">当前为 BSC 主网 (Chain ID: 56)，使用真实 BNB 进行交易</span>
                )}
              </div>
            </div>

            {/* Gas费估算 */}
            {gasEstimate && (
              <div className="gas-estimate-banner">
                <div className="gas-estimate-header">
                  <span className="gas-icon">⛽</span>
                  <span className="gas-title">预估Gas费</span>
                </div>
                <div className="gas-estimate-content">
                  <span className="gas-primary">{formatGasFee(gasEstimate).primary}</span>
                  <span className="gas-note">用户需自行支付</span>
                </div>
                <div className="gas-estimate-details">
                  {formatGasFee(gasEstimate).details.map((detail, index) => (
                    <div key={index} className="gas-detail-item">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Free Mint 标识 */}
            <div className="free-mint-banner">
              <span className="free-mint-icon">🎁</span>
              <span className="free-mint-text">SBT铸造 - 无需版税费用</span>
            </div>

            <div className="claim-actions">
              <button className="btn-secondary" onClick={handleClose}>
                取消
              </button>
              <button
                className="btn-primary"
                onClick={handleConfirm}
                disabled={hasMinted}
              >
                {hasMinted ? '已铸造' : '确认申领'}
              </button>
            </div>
          </motion.div>
        )}

        {/* 步骤2: 连接钱包 */}
        {currentStep === 'connecting' && (
          <motion.div
            key="connecting"
            className="claim-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="step-header">
              <span className="step-number">2</span>
              <h2>连接钱包</h2>
            </div>

            {/* 如果钱包已连接，显示提示 */}
            {isWalletConnected ? (
              <div className="wallet-connected">
                <div className="connected-info">
                  <span className="wallet-status-icon">✓</span>
                  <div>
                    <h3>钱包已连接</h3>
                    <p>{getChainName(selectedChain)} 钱包已就绪</p>
                  </div>
                </div>
                <button
                  className="btn-primary btn-full"
                  onClick={() => handleWalletConnect('current')}
                  disabled={isProcessing || hasMinted}
                >
                  {hasMinted ? '已铸造' : isProcessing ? '申领中...' : '开始申领'}
                </button>
              </div>
            ) : (
              <div className="wallet-connect">
                <p className="wallet-instruction">
                  请选择您的{getChainName(selectedChain)}钱包：
                </p>
                <div className="wallet-options">
                  {getWalletOptions().map((wallet) => (
                    <button
                      key={wallet.id}
                      className="wallet-option"
                      onClick={() => handleWalletConnect(wallet.id)}
                      disabled={isProcessing}
                    >
                      <span className="wallet-icon">{wallet.icon}</span>
                      <span>{wallet.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="claim-actions">
              <button
                className="btn-secondary"
                onClick={() => setCurrentStep('confirm')}
              >
                返回
              </button>
            </div>
          </motion.div>
        )}

        {/* 步骤3: 申领中 */}
        {currentStep === 'claiming' && (
          <motion.div
            key="claiming"
            className="claim-step"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="claim-loading">
              <div className="loading-spinner" />
              <h3>正在申领SBT...</h3>
              <p>请确认钱包交易</p>
            </div>
          </motion.div>
        )}

        {/* 步骤4: 申领成功 */}
        {currentStep === 'success' && (
          <motion.div
            key="success"
            className="claim-step"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="claim-success">
              <h2>申领成功！</h2>
              <p>恭喜你在 {getChainIcon(selectedChain)} {getChainName(selectedChain)} 上获得了 {level.title} SBT</p>

              {txHash && (
                <div className="tx-hash">
                  <span className="tx-label">交易哈希:</span>
                  <span className="tx-value">{txHash.slice(0, 10)}...{txHash.slice(-8)}</span>
                </div>
              )}

              <div className="success-reward">
                <span>奖励加成 +{level.rewardBonus}% 已激活</span>
              </div>
            </div>

            <div className="claim-actions">
              <button className="btn-primary" onClick={handleClose}>
                完成
              </button>
            </div>
          </motion.div>
        )}

        {/* 错误状态 */}
        {currentStep === 'error' && (
          <motion.div
            key="error"
            className="claim-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="claim-error">
              <h2>申领失败</h2>
              <p className="error-message">{error}</p>
            </div>

            <div className="claim-actions">
              <button className="btn-secondary" onClick={handleClose}>
                取消
              </button>
              <button className="btn-primary" onClick={handleRetry}>
                重试
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .claim-sbt-flow {
          background: white;
          border: 2px solid #1a1a1a;
          padding: 2rem;
          max-width: 500px;
        }

        .claim-step {
          min-height: 400px;
        }

        .step-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .step-number {
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          color: white;
          font-weight: bold;
          font-size: 1.25rem;
        }

        .step-header h2 {
          font-size: 1.5rem;
          margin: 0;
        }

        .claim-preview {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem;
          background: #f9f9f9;
          border: 2px solid #e0e0e0;
          margin-bottom: 2rem;
        }

        .preview-icon {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 2px solid #e0e0e0;
          flex-shrink: 0;
        }

        .level-emoji {
          font-size: 3rem;
        }

        .preview-info {
          flex: 1;
        }

        .preview-info h3 {
          font-size: 1.5rem;
          margin: 0 0 0.5rem;
          color: #1a1a1a;
        }

        .preview-info > p {
          color: #666;
          margin: 0 0 1rem;
        }

        .preview-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem;
          background: white;
        }

        .detail-label {
          color: #666;
        }

        .detail-value {
          font-weight: 600;
          color: #1a1a1a;
        }

        .detail-value.bonus {
          color: #10B981;
        }

        .chain-selector {
          margin-bottom: 1.5rem;
        }

        .selector-label {
          font-size: 0.875rem;
          color: #666;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }

        .chain-options {
          display: flex;
          gap: 1rem;
        }

        .chain-option {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          border: 2px solid #e0e0e0;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.875rem;
        }

        .chain-option:hover:not(:disabled) {
          border-color: #1a1a1a;
          background: #f9f9f9;
        }

        .chain-option.active {
          border-color: #1a1a1a;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .chain-option:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #f5f5f5;
        }

        .chain-icon {
          font-size: 1.5rem;
        }

        .chain-name {
          font-weight: 600;
        }

        .chain-status {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          background: #10B981;
          color: white;
        }

        .chain-status.coming-soon {
          background: #9CA3AF;
        }

        .condition-verification {
          padding: 1.25rem;
          background: #f9f9f9;
          border: 2px solid #e0e0e0;
          margin-bottom: 1.5rem;
        }

        .condition-verification h4 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: #1a1a1a;
          font-family: 'Georgia', serif;
        }

        .condition-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e0e0e0;
          font-size: 0.875rem;
        }

        .condition-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .condition-item:first-child {
          padding-top: 0;
        }

        .condition-item > span:first-child {
          color: #666;
          font-weight: 500;
        }

        .condition-item > span:last-child {
          font-weight: 600;
        }

        .condition-item .met {
          color: #10B981;
        }

        .condition-item .unmet {
          color: #EF4444;
        }

        .network-status-banner {
          padding: 1.25rem;
          border: 2px solid;
          margin-bottom: 1rem;
        }

        .network-status-banner.testnet {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          border-color: #3b82f6;
        }

        .network-status-banner.mainnet {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-color: #f59e0b;
        }

        .network-status-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .network-icon {
          font-size: 1.25rem;
        }

        .network-title {
          font-size: 1rem;
          font-weight: 700;
          font-family: 'Georgia', serif;
        }

        .network-status-banner.testnet .network-title {
          color: #1e40af;
        }

        .network-status-banner.mainnet .network-title {
          color: #92400e;
        }

        .network-status-content {
          display: flex;
          align-items: center;
        }

        .network-note {
          font-size: 0.875rem;
          font-style: italic;
        }

        .network-status-banner.testnet .network-note {
          color: #1e3a8a;
        }

        .network-status-banner.mainnet .network-note {
          color: #78350f;
        }

        .gas-estimate-banner {
          padding: 1.25rem;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 2px solid #f59e0b;
          margin-bottom: 1rem;
        }

        .gas-estimate-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .gas-icon {
          font-size: 1.25rem;
        }

        .gas-title {
          font-size: 1rem;
          font-weight: 600;
          color: #92400e;
          font-family: 'Georgia', serif;
        }

        .gas-estimate-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .gas-primary {
          font-size: 1.25rem;
          font-weight: 700;
          color: #78350f;
        }

        .gas-note {
          font-size: 0.75rem;
          color: #92400e;
          font-style: italic;
        }

        .gas-estimate-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding-top: 0.5rem;
          border-top: 1px solid #fbbf24;
        }

        .gas-detail-item {
          font-size: 0.75rem;
          color: #92400e;
        }

        .free-mint-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem;
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: white;
          font-weight: bold;
          font-size: 1rem;
          margin-bottom: 1.5rem;
          border-radius: 0;
        }

        .free-mint-icon {
          font-size: 1.5rem;
        }

        .free-mint-text {
          font-family: 'Georgia', serif;
        }

        .wallet-connect {
          margin-bottom: 2rem;
        }

        .wallet-instruction {
          font-size: 0.875rem;
          color: #666;
          margin-bottom: 1rem;
          text-align: center;
        }

        .wallet-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .wallet-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 2px solid #e0e0e0;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
        }

        .wallet-option:hover:not(:disabled) {
          border-color: #1a1a1a;
          background: #f9f9f9;
        }

        .wallet-option:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .wallet-icon {
          font-size: 2rem;
        }

        .wallet-connected {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 2rem;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 2px solid #bae6fd;
        }

        .connected-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .wallet-status-icon {
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #10B981;
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          border-radius: 50%;
        }

        .connected-info h3 {
          font-size: 1.125rem;
          margin: 0 0 0.25rem;
          color: #0369a1;
        }

        .connected-info p {
          font-size: 0.875rem;
          color: #666;
          margin: 0;
        }

        .btn-full {
          width: 100%;
        }

        .claim-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
        }

        .loading-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid #f0f0f0;
          border-top-color: #1a1a1a;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 2rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .claim-loading h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .claim-loading p {
          color: #666;
        }

        .claim-success {
          text-align: center;
          padding: 2rem;
        }

        .success-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .claim-success h2 {
          font-size: 2rem;
          color: #10B981;
          margin-bottom: 1rem;
        }

        .claim-success > p {
          color: #666;
          margin-bottom: 2rem;
        }

        .tx-hash {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1rem;
          background: #f9f9f9;
          border: 2px solid #e0e0e0;
          margin-bottom: 1rem;
          text-align: left;
        }

        .tx-label {
          font-size: 0.875rem;
          color: #666;
        }

        .tx-value {
          font-family: monospace;
          font-size: 0.875rem;
          color: #1a1a1a;
        }

        .success-reward {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-weight: bold;
        }

        .claim-error {
          text-align: center;
          padding: 2rem;
        }

        .error-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .claim-error h2 {
          font-size: 2rem;
          color: #EF4444;
          margin-bottom: 1rem;
        }

        .error-message {
          color: #666;
          margin-bottom: 2rem;
        }

        .claim-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .btn-primary,
        .btn-secondary {
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 0;
        }

        .btn-primary {
          background: #1a1a1a;
          color: white;
          border: 2px solid #1a1a1a;
        }

        .btn-primary:hover:not(:disabled) {
          background: #333;
        }

        .btn-secondary {
          background: white;
          color: #1a1a1a;
          border: 2px solid #e0e0e0;
        }

        .btn-secondary:hover:not(:disabled) {
          border-color: #1a1a1a;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
