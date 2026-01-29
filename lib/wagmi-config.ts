import { http, createConfig } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// 根据环境变量决定使用主网还是测试网
const isTestnet = process.env.NEXT_PUBLIC_BNB_CHAIN_TESTNET === 'true';
const activeChain = isTestnet ? bscTestnet : bsc;

// 准备 connectors
const connectors = [injected()];

// 只有配置了 WalletConnect Project ID 时才添加 WalletConnect connector
if (process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
  connectors.push(
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    }) as any
  );
}

// Wagmi configuration - 使用 BNB 主网或测试网
export const wagmiConfig = createConfig({
  chains: [activeChain],
  connectors,
  transports: {
    [activeChain.id]: http(),
  } as any,
  ssr: true,
});

// 导出链ID供其他模块使用
export const CHAIN_IDS = {
  BSC: bsc.id, // 56 - BSC 主网
  BSC_TESTNET: bscTestnet.id, // 97 - BSC 测试网
  ACTIVE_CHAIN: activeChain.id,
};

// 导出RPC URL
export const RPC_URLS = {
  BSC: 'https://bsc-dataseed1.binance.org',
  BSC_TESTNET: 'https://bsc-testnet.publicnode.com',
};

// 导出当前使用的链
export const getCurrentChain = () => activeChain;
