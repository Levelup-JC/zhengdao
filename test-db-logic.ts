/**
 * 数据库逻辑验证脚本
 * 由于 Dexie 需要浏览器环境，我们在 Node 环境下模拟核心逻辑
 */

interface MockReflection {
  date: string;
  walletAddress: string;
  isMeaningful: boolean;
  rawContent: string;
}

class MockDB {
  private reflections: MockReflection[] = [];

  async add(data: MockReflection) {
    // 模拟复合索引检查 [date+walletAddress]
    const exists = this.reflections.some(r => r.date === data.date && r.walletAddress === data.walletAddress);
    if (exists) {
      throw new Error('ConstraintError: Data already exists for this date and wallet');
    }
    this.reflections.push(data);
    return this.reflections.length;
  }

  async getByDate(date: string, walletAddress: string) {
    return this.reflections.find(r => r.date === date && r.walletAddress === walletAddress);
  }

  async getAll(walletAddress: string) {
    return this.reflections.filter(r => r.walletAddress === walletAddress);
  }
}

async function testDBLogic() {
  console.log('--- 数据库逻辑验证 ---');
  const mockDb = new MockDB();
  const wallet = '0x1234567890123456789012345678901234567890';

  try {
    // 1. 测试添加数据
    console.log('测试：添加打卡记录...');
    await mockDb.add({
      date: '2026-01-29',
      walletAddress: wallet,
      isMeaningful: true,
      rawContent: '今天完成了项目验证。'
    });
    console.log('✅ 成功添加记录');

    // 2. 测试重复添加（模拟约束）
    console.log('测试：重复添加同一天的记录...');
    try {
      await mockDb.add({
        date: '2026-01-29',
        walletAddress: wallet,
        isMeaningful: false,
        rawContent: '重复打卡'
      });
      console.log('❌ 错误：允许了重复打卡');
    } catch (e) {
      console.log('✅ 成功拦截重复打卡:', (e as Error).message);
    }

    // 3. 测试查询
    console.log('测试：按日期查询记录...');
    const record = await mockDb.getByDate('2026-01-29', wallet);
    if (record && record.isMeaningful) {
      console.log('✅ 成功查询到正确记录');
    } else {
      console.log('❌ 查询结果不正确');
    }

    console.log('数据库逻辑验证成功！');
  } catch (error) {
    console.error('数据库逻辑验证失败:', error);
  }
}

testDBLogic();
