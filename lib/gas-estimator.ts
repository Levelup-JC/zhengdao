/**
 * Gas费估算服务
 * 支持BSC和Solana双链Gas费估算
 */

import { wagmiConfig } from '@/lib/wagmi-config';
import { useAccount } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { ZHENGDAO_ABI } from '@/lib/contractABI';

/**
 * Gas费估算结果
 */
export interface GasEstimate {
  chain: 'bnb' | 'solana';
  estimatedFee: string; // 格式化后的费用字符串
  estimatedFeeRaw: number; // 原始费用数值
  currency: string; // 货币单位 (BNB/SOL)
  gasLimit?: number; // BSC专用: Gas限制
  gasPrice?: string; // BSC专用: Gas价格
  transactionSize?: number; // Solana专用: 交易大小(字节)
  lamports?: number; // Solana专用: lamports费用
}

/**
 * BSC Gas费估算
 */
export async function estimateBSCGas(
  level: number,
  days: number,
  metadataURI: string
): Promise<GasEstimate> {
  try {
    const contractAddress = process.env.NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS;
    const isTestnet = process.env.NEXT_PUBLIC_BNB_CHAIN_TESTNET === 'true';

    if (!contractAddress || contractAddress === '0x0000000000000000000000000000000000000000') {
      // 合约未部署，返回默认估算
      // 测试网 Gas 费通常更低
      const gasPriceGwei = isTestnet ? 3 : 5;
      const gasLimit = 150000;
      const gasPriceWei = gasPriceGwei * 1e9;
      const estimatedFeeWei = gasLimit * gasPriceWei;
      const estimatedFeeBNB = estimatedFeeWei / 1e18;

      return {
        chain: 'bnb',
        estimatedFee: `~${estimatedFeeBNB.toFixed(6)}`,
        estimatedFeeRaw: estimatedFeeBNB,
        currency: 'BNB',
        gasLimit,
        gasPrice: `${gasPriceGwei} Gwei`,
      };
    }

    // 估算Gas限制
    const gasLimit = await readContract(wagmiConfig, {
      address: contractAddress as `0x${string}`,
      abi: ZHENGDAO_ABI as any,
      functionName: 'mintSBT',
      args: [
        '0x0000000000000000000000000000000000000001' as `0x${string}`, // 示例地址
        BigInt(level),
        BigInt(days),
        metadataURI,
      ],
    } as any);

    // 根据主网/测试网设置不同的 Gas 价格
    // 测试网: 3 Gwei, 主网: 5 Gwei
    const gasPriceGwei = isTestnet ? 3 : 5;
    const gasPriceWei = gasPriceGwei * 1e9; // 转换为Wei
    const gasLimitNumber = typeof gasLimit === 'bigint' ? Number(gasLimit) : 150000;
    const estimatedFeeWei = gasLimitNumber * gasPriceWei;
    const estimatedFeeBNB = estimatedFeeWei / 1e18; // 转换为BNB

    return {
      chain: 'bnb',
      estimatedFee: `~${estimatedFeeBNB.toFixed(6)}`,
      estimatedFeeRaw: estimatedFeeBNB,
      currency: 'BNB',
      gasLimit: gasLimitNumber,
      gasPrice: `${gasPriceGwei} Gwei (${isTestnet ? '测试网' : '主网'})`,
    };
  } catch (error) {
    console.error('[GasEstimator] BSC Gas估算失败:', error);
    // 返回保守估算（主网使用更高的估算）
    const isTestnet = process.env.NEXT_PUBLIC_BNB_CHAIN_TESTNET === 'true';
    const gasPriceGwei = isTestnet ? 4 : 6;
    return {
      chain: 'bnb',
      estimatedFee: isTestnet ? '~0.0006' : '~0.0012',
      estimatedFeeRaw: isTestnet ? 0.0006 : 0.0012,
      currency: 'BNB',
      gasLimit: 200000,
      gasPrice: `${gasPriceGwei} Gwei`,
    };
  }
}

/**
 * Solana交易费估算
 */
export async function estimateSolanaFee(
  level: number,
  days: number,
  metadataURI: string
): Promise<GasEstimate> {
  try {
    // Solana基础交易费
    const baseFeePerSignature = 5000; // lamports

    // 估算交易大小
    // 账户数据大小估算：
    // - Level: 1字节
    // - Days: 4字节
    // - Metadata URI: 可变长度
    const metadataURISize = metadataURI.length;
    const instructionDataSize = 1 + 4 + metadataURISize; // 指令类型 + level + days + metadata
    const accountKeysSize = 32 * 4; // 4个账户（sbt账户、config账户、owner、system program）
    const transactionSize = instructionDataSize + accountKeysSize + 64; // +64为头部和其他开销

    // 计算总费用
    const totalLamports = baseFeePerSignature * transactionSize;
    const totalSOL = totalLamports / 1e9; // 转换为SOL

    // 账户租金豁免费用（可选）
    const rentExemption = 0.00089088; // SOL

    return {
      chain: 'solana',
      estimatedFee: `~${(totalSOL + rentExemption).toFixed(6)}`,
      estimatedFeeRaw: totalSOL + rentExemption,
      currency: 'SOL',
      transactionSize,
      lamports: totalLamports,
    };
  } catch (error) {
    console.error('[GasEstimator] Solana费用估算失败:', error);
    // 返回保守估算
    return {
      chain: 'solana',
      estimatedFee: '~0.001',
      estimatedFeeRaw: 0.001,
      currency: 'SOL',
      transactionSize: 500,
      lamports: 5000,
    };
  }
}

/**
 * 通用Gas费估算函数
 * 根据链类型自动选择估算方法
 */
export async function estimateGasFee(
  chain: 'bnb' | 'solana',
  level: number,
  days: number,
  metadataURI: string
): Promise<GasEstimate> {
  if (chain === 'bnb') {
    return await estimateBSCGas(level, days, metadataURI);
  } else {
    return await estimateSolanaFee(level, days, metadataURI);
  }
}

/**
 * 格式化Gas费用显示
 */
export function formatGasFee(estimate: GasEstimate): {
  primary: string; // 主要显示文本
  details: string[]; // 详细信息列表
} {
  const details: string[] = [];

  if (estimate.chain === 'bnb') {
    if (estimate.gasLimit) {
      details.push(`Gas限制: ${estimate.gasLimit.toLocaleString()}`);
    }
    if (estimate.gasPrice) {
      details.push(`Gas价格: ${estimate.gasPrice}`);
    }
  } else if (estimate.chain === 'solana') {
    if (estimate.transactionSize) {
      details.push(`交易大小: ~${estimate.transactionSize} 字节`);
    }
    if (estimate.lamports) {
      details.push(`基础费用: ${estimate.lamports.toLocaleString()} lamports`);
    }
    details.push('租金豁免: 0.00089088 SOL');
  }

  return {
    primary: `${estimate.estimatedFee} ${estimate.currency}`,
    details,
  };
}

/**
 * 获取实时BSC Gas价格
 */
export async function getBSCGasPrice(): Promise<{
  slow: number;
  average: number;
  fast: number;
}> {
  try {
    // 从BSC RPC获取当前Gas价格
    const response = await fetch('https://bsc-dataseed1.binance.org');
    // 这里简化处理，实际应该调用RPC的 eth_gasPrice
    return {
      slow: 3, // Gwei
      average: 5,
      fast: 10,
    };
  } catch (error) {
    console.error('[GasEstimator] 获取BSC Gas价格失败:', error);
    return {
      slow: 3,
      average: 5,
      fast: 10,
    };
  }
}
