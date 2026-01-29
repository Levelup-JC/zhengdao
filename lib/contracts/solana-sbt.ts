/**
 * Solana SBT程序交互封装
 * 使用@solana/web3.js进行程序调用
 *
 * ⚠️ 注意：Solana SBT 功能即将推出（V2）
 * 当前 MVP 版本使用 BNB Chain，Solana 支持将在后续版本中提供。
 */

import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  SystemProgram,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import { createSolanaConnection, getSolanaRPCUrl } from '../solana-wallet';

/**
 * Solana SBT程序ID配置
 *
 * ⚠️ 占位符 Program ID，用于 V2 功能
 */
const SBT_PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_SOLANA_SBT_PROGRAM_ID || '11111111111111111111111111111111'
);

/**
 * 检查 Solana SBT 是否可用
 * @returns 是否可用
 */
export function isSolanaSBTAvailable(): boolean {
  const programId = process.env.NEXT_PUBLIC_SOLANA_SBT_PROGRAM_ID || '';
  // 检查是否配置了有效的 Program ID（不是默认的 System Program ID）
  return programId.length > 0 && programId !== '11111111111111111111111111111111';
}

/**
 * SBT账户种子前缀
 */
const SBT_ACCOUNT_SEED = 'sbt';
const METADATA_ACCOUNT_SEED = 'metadata';

/**
 * Solana SBT元数据结构
 */
export interface SolanaSBTMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
    display_type?: string;
  }>;
}

/**
 * SBT Token详情
 */
export interface SolanaSBTTokenDetails {
  level: number;
  days: number;
  mintDate: number;
  owner: string;
  metadataURI: string;
  updateAuthority: string;
}

/**
 * SBT铸造参数
 */
export interface MintSBTParams {
  walletAddress: string;
  level: number;
  days: number;
  metadataURI: string;
}

/**
 * SBT初始化参数
 */
export interface InitializeSBTParams {
  authority: string;
  metadataURI: string;
}

/**
 * 自定义错误类
 */
export class SolanaSBTError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'SolanaSBTError';
  }
}

/**
 * Solana SBT服务类
 * 提供SBT程序的完整交互接口
 */
export class SolanaSBTService {
  private connection: Connection;
  private programId: PublicKey;

  /**
   * 构造函数
   * @param connection Solana连接对象（可选，默认使用全局配置）
   * @param programId 程序ID（可选，默认使用环境变量配置）
   */
  constructor(connection?: Connection, programId?: string) {
    this.connection = connection || createSolanaConnection();
    this.programId = programId ? new PublicKey(programId) : SBT_PROGRAM_ID;
  }

  /**
   * 获取程序ID
   * @returns 程序ID PublicKey
   */
  getProgramId(): PublicKey {
    return this.programId;
  }

  /**
   * 获取连接对象
   * @returns Connection对象
   */
  getConnection(): Connection {
    return this.connection;
  }

  /**
   * 初始化SBT程序
   * 创建程序全局配置账户
   * @param params 初始化参数
   * @param signerPayer 支付费用的公钥
   * @returns 交易对象
   */
  async initialize(
    params: InitializeSBTParams,
    signerPayer: PublicKey
  ): Promise<Transaction> {
    try {
      // 1. 验证参数
      if (!params.authority || !params.metadataURI) {
        throw new SolanaSBTError(
          '初始化参数不完整',
          'INVALID_PARAMS'
        );
      }

      // 2. 生成配置账户PDA（Program Derived Address）
      const [configAccount] = await this.findConfigAddress();

      // 3. 检查是否已初始化
      const accountInfo = await this.connection.getAccountInfo(configAccount);
      if (accountInfo) {
        throw new SolanaSBTError(
          '程序已初始化',
          'ALREADY_INITIALIZED'
        );
      }

      // 4. 创建交易
      const transaction = new Transaction();

      // 5. 添加初始化指令
      const instruction = new TransactionInstruction({
        keys: [
          {
            pubkey: configAccount,
            isSigner: false,
            isWritable: true
          },
          {
            pubkey: signerPayer,
            isSigner: true,
            isWritable: true
          },
          {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false
          }
        ],
        programId: this.programId,
        data: this.encodeInitializeData(params)
      });

      transaction.add(instruction);

      console.log('[SolanaSBT] 初始化交易已创建');
      return transaction;
    } catch (error) {
      console.error('[SolanaSBT] 初始化失败:', error);
      if (error instanceof SolanaSBTError) {
        throw error;
      }
      throw new SolanaSBTError(
        '初始化失败',
        'INIT_FAILED',
        error
      );
    }
  }

  /**
   * 铸造SBT
   * @param params 铸造参数
   * @param owner 所有者公钥
   * @returns 交易对象
   */
  async mintSBT(
    params: MintSBTParams,
    owner: PublicKey
  ): Promise<Transaction> {
    try {
      // 1. 验证参数
      this.validateMintParams(params);

      // 2. 生成SBT账户PDA
      const [sbtAccount] = await this.findSBTAddress(owner, params.level);

      // 3. 检查SBT是否已存在
      const accountInfo = await this.connection.getAccountInfo(sbtAccount);
      if (accountInfo) {
        throw new SolanaSBTError(
          `等级${params.level}的SBT已铸造`,
          'ALREADY_MINTED'
        );
      }

      // 4. 获取配置账户
      const [configAccount] = await this.findConfigAddress();

      // 5. 创建交易
      const transaction = new Transaction();

      // 6. 添加铸造指令
      const instruction = new TransactionInstruction({
        keys: [
          {
            pubkey: sbtAccount,
            isSigner: false,
            isWritable: true
          },
          {
            pubkey: configAccount,
            isSigner: false,
            isWritable: false
          },
          {
            pubkey: owner,
            isSigner: true,
            isWritable: false
          },
          {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false
          }
        ],
        programId: this.programId,
        data: this.encodeMintData(params)
      });

      transaction.add(instruction);

      console.log('[SolanaSBT] 铸造交易已创建:', { level: params.level });
      return transaction;
    } catch (error) {
      console.error('[SolanaSBT] 铸造失败:', error);
      if (error instanceof SolanaSBTError) {
        throw error;
      }
      throw new SolanaSBTError(
        '铸造失败',
        'MINT_FAILED',
        error
      );
    }
  }

  /**
   * 获取SBT详情
   * @param owner 所有者公钥
   * @param level 等级
   * @returns SBT详情
   */
  async getSBT(owner: PublicKey, level: number): Promise<SolanaSBTTokenDetails | null> {
    try {
      const [sbtAccount] = await this.findSBTAddress(owner, level);

      const accountInfo = await this.connection.getAccountInfo(sbtAccount);

      if (!accountInfo || !accountInfo.data) {
        return null;
      }

      // 解析账户数据
      return this.decodeSBTAccount(accountInfo.data, owner);
    } catch (error) {
      console.error('[SolanaSBT] 获取SBT失败:', error);
      throw new SolanaSBTError(
        '获取SBT失败',
        'GET_FAILED',
        error
      );
    }
  }

  /**
   * 获取用户所有SBT
   * @param owner 所有者公钥
   * @returns SBT列表
   */
  async getAllSBTs(owner: PublicKey): Promise<SolanaSBTTokenDetails[]> {
    try {
      const sbts: SolanaSBTTokenDetails[] = [];

      // 检查6个等级的SBT
      for (let level = 1; level <= 6; level++) {
        const sbt = await this.getSBT(owner, level);
        if (sbt) {
          sbts.push(sbt);
        }
      }

      return sbts;
    } catch (error) {
      console.error('[SolanaSBT] 获取所有SBT失败:', error);
      throw new SolanaSBTError(
        '获取所有SBT失败',
        'GET_ALL_FAILED',
        error
      );
    }
  }

  /**
   * 更新SBT元数据
   * @param owner 所有者公钥
   * @param level 等级
   * @param newMetadataURI 新的元数据URI
   * @returns 交易对象
   */
  async updateMetadata(
    owner: PublicKey,
    level: number,
    newMetadataURI: string
  ): Promise<Transaction> {
    try {
      // 1. 验证参数
      if (!newMetadataURI) {
        throw new SolanaSBTError(
          '元数据URI不能为空',
          'INVALID_METADATA_URI'
        );
      }

      // 2. 生成SBT账户PDA
      const [sbtAccount] = await this.findSBTAddress(owner, level);

      // 3. 检查SBT是否存在
      const accountInfo = await this.connection.getAccountInfo(sbtAccount);
      if (!accountInfo) {
        throw new SolanaSBTError(
          'SBT不存在',
          'NOT_FOUND'
        );
      }

      // 4. 获取配置账户
      const [configAccount] = await this.findConfigAddress();

      // 5. 创建交易
      const transaction = new Transaction();

      // 6. 添加更新指令
      const instruction = new TransactionInstruction({
        keys: [
          {
            pubkey: sbtAccount,
            isSigner: false,
            isWritable: true
          },
          {
            pubkey: configAccount,
            isSigner: false,
            isWritable: false
          },
          {
            pubkey: owner,
            isSigner: true,
            isWritable: false
          }
        ],
        programId: this.programId,
        data: this.encodeUpdateMetadataData(newMetadataURI)
      });

      transaction.add(instruction);

      console.log('[SolanaSBT] 更新元数据交易已创建');
      return transaction;
    } catch (error) {
      console.error('[SolanaSBT] 更新元数据失败:', error);
      if (error instanceof SolanaSBTError) {
        throw error;
      }
      throw new SolanaSBTError(
        '更新元数据失败',
        'UPDATE_FAILED',
        error
      );
    }
  }

  /**
   * 查找配置账户地址（PDA）
   * @returns PDA地址和bump seed
   */
  private async findConfigAddress(): Promise<[PublicKey, number]> {
    return PublicKey.findProgramAddress(
      [Buffer.from('config')],
      this.programId
    );
  }

  /**
   * 查找SBT账户地址（PDA）
   * @param owner 所有者公钥
   * @param level 等级
   * @returns PDA地址和bump seed
   */
  private async findSBTAddress(owner: PublicKey, level: number): Promise<[PublicKey, number]> {
    return PublicKey.findProgramAddress(
      [
        Buffer.from(SBT_ACCOUNT_SEED),
        owner.toBuffer(),
        Buffer.from(new Uint8Array([level]))
      ],
      this.programId
    );
  }

  /**
   * 编码初始化指令数据
   * @param params 初始化参数
   * @returns Buffer
   */
  private encodeInitializeData(params: InitializeSBTParams): Buffer {
    // 指令数据格式：
    // - 1字节: 指令类型 (0 = 初始化)
    // - 32字节: authority公钥
    // - 可变长度: metadataURI字符串

    const authorityPubkey = new PublicKey(params.authority);
    const metadataURIBuffer = Buffer.from(params.metadataURI, 'utf-8');

    const buffer = Buffer.alloc(1 + 32 + metadataURIBuffer.length);
    let offset = 0;

    // 指令类型
    buffer.writeUInt8(0, offset);
    offset += 1;

    // authority公钥
    authorityPubkey.toBuffer().copy(buffer, offset);
    offset += 32;

    // metadataURI
    metadataURIBuffer.copy(buffer, offset);

    return buffer;
  }

  /**
   * 编码铸造指令数据
   * @param params 铸造参数
   * @returns Buffer
   */
  private encodeMintData(params: MintSBTParams): Buffer {
    // 指令数据格式：
    // - 1字节: 指令类型 (1 = 铸造)
    // - 1字节: 等级
    // - 4字节: 天数（小端序）
    // - 可变长度: metadataURI字符串

    const metadataURIBuffer = Buffer.from(params.metadataURI, 'utf-8');

    const buffer = Buffer.alloc(1 + 1 + 4 + metadataURIBuffer.length);
    let offset = 0;

    // 指令类型
    buffer.writeUInt8(1, offset);
    offset += 1;

    // 等级
    buffer.writeUInt8(params.level, offset);
    offset += 1;

    // 天数（小端序）
    buffer.writeUInt32LE(params.days, offset);
    offset += 4;

    // metadataURI
    metadataURIBuffer.copy(buffer, offset);

    return buffer;
  }

  /**
   * 编码更新元数据指令数据
   * @param metadataURI 新的元数据URI
   * @returns Buffer
   */
  private encodeUpdateMetadataData(metadataURI: string): Buffer {
    // 指令数据格式：
    // - 1字节: 指令类型 (2 = 更新元数据)
    // - 可变长度: metadataURI字符串

    const metadataURIBuffer = Buffer.from(metadataURI, 'utf-8');

    const buffer = Buffer.alloc(1 + metadataURIBuffer.length);
    buffer.writeUInt8(2, 0);
    metadataURIBuffer.copy(buffer, 1);

    return buffer;
  }

  /**
   * 解码SBT账户数据
   * @param data 账户数据Buffer
   * @param owner 所有者公钥
   * @returns 解码后的SBT详情
   */
  private decodeSBTAccount(data: Buffer, owner: PublicKey): SolanaSBTTokenDetails {
    try {
      // 数据格式（根据Solana程序定义）：
      // - 1字节: 等级
      // - 4字节: 天数（小端序）
      // - 8字节: 铸造日期时间戳（小端序）
      // - 32字节: 所有者公钥
      // - 32字节: 更新权限公钥
      // - 4字节: metadataURI长度
      // - 可变长度: metadataURI字符串

      let offset = 0;

      const level = data.readUInt8(offset);
      offset += 1;

      const days = data.readUInt32LE(offset);
      offset += 4;

      const mintDate = data.readBigUInt64LE(offset);
      offset += 8;

      const ownerBytes = data.slice(offset, offset + 32);
      offset += 32;

      const updateAuthorityBytes = data.slice(offset, offset + 32);
      offset += 32;

      const metadataURILength = data.readUInt32LE(offset);
      offset += 4;

      const metadataURI = data.slice(offset, offset + metadataURILength).toString('utf-8');

      return {
        level,
        days,
        mintDate: Number(mintDate),
        owner: owner.toBase58(),
        metadataURI,
        updateAuthority: new PublicKey(updateAuthorityBytes).toBase58()
      };
    } catch (error) {
      console.error('[SolanaSBT] 解码账户数据失败:', error);
      throw new SolanaSBTError(
        '解码账户数据失败',
        'DECODE_FAILED',
        error
      );
    }
  }

  /**
   * 验证铸造参数
   * @param params 铸造参数
   * @throws SolanaSBTError 如果参数无效
   */
  private validateMintParams(params: MintSBTParams): void {
    if (!params.walletAddress) {
      throw new SolanaSBTError(
        '钱包地址不能为空',
        'INVALID_WALLET_ADDRESS'
      );
    }

    if (params.level < 1 || params.level > 6) {
      throw new SolanaSBTError(
        '等级必须在1-6之间',
        'INVALID_LEVEL'
      );
    }

    if (params.days < 1) {
      throw new SolanaSBTError(
        '天数必须大于0',
        'INVALID_DAYS'
      );
    }

    if (!params.metadataURI) {
      throw new SolanaSBTError(
        '元数据URI不能为空',
        'INVALID_METADATA_URI'
      );
    }
  }

  /**
   * 检查程序是否已初始化
   * @returns 是否已初始化
   */
  async isInitialized(): Promise<boolean> {
    try {
      const [configAccount] = await this.findConfigAddress();
      const accountInfo = await this.connection.getAccountInfo(configAccount);
      return !!accountInfo;
    } catch (error) {
      console.error('[SolanaSBT] 检查初始化状态失败:', error);
      return false;
    }
  }

  /**
   * 估算交易费用
   * @param transaction 交易对象
   * @returns 预估费用（lamports）
   */
  async estimateFee(transaction: Transaction): Promise<number> {
    try {
      const { feeCalculator } = await this.connection.getRecentBlockhash();
      return transaction.compileMessage().serialize().length * feeCalculator.lamportsPerSignature;
    } catch (error) {
      console.error('[SolanaSBT] 估算费用失败:', error);
      // 默认返回5000 lamports（0.000005 SOL）
      return 5000;
    }
  }
}

/**
 * 创建默认的Solana SBT服务实例
 */
export function createSolanaSBTService(): SolanaSBTService {
  return new SolanaSBTService();
}

/**
 * 获取Solana浏览器URL
 * @param type 类型
 * @param value 值（签名或地址）
 * @returns 完整URL
 */
export function getSolanaExplorerUrl(
  type: 'tx' | 'address' | 'account',
  value: string
): string {
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
  const cluster = network === 'mainnet-beta' ? '' : `?cluster=${network}`;
  return `https://explorer.solana.com/${type}/${value}${cluster}`;
}

/**
 * 格式化Solana地址
 * @param address 完整地址
 * @param length 前后保留的字符数
 * @returns 格式化后的地址
 */
export function formatSolanaAddress(address: string, length: number = 4): string {
  if (!address || address.length < length * 2) {
    return address;
  }
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}

/**
 * 获取程序配置状态
 * @returns 程序配置信息
 */
export async function getSolanaSBTConfig(): Promise<{
  programId: string;
  network: string;
  isInitialized: boolean;
  rpcUrl: string;
}> {
  const service = createSolanaSBTService();
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
  const rpcUrl = getSolanaRPCUrl();

  return {
    programId: service.getProgramId().toBase58(),
    network,
    isInitialized: await service.isInitialized(),
    rpcUrl
  };
}
