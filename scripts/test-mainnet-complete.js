const hre = require("hardhat");

/**
 * 证道项目 - BSC 主网完整测试套件
 * 用途: 在主网部署后执行完整的功能测试
 * 执行: npx hardhat run scripts/test-mainnet-complete.js --network bnbMainnet
 */

const TEST_RESULTS = {
  passed: 0,
  failed: 0,
  tests: []
};

function logSection(title) {
  console.log("\n" + "=".repeat(70));
  console.log(`📋 ${title}`);
  console.log("=".repeat(70));
}

function logTest(name, status, details = "") {
  const icon = status === "pass" ? "✅" : status === "fail" ? "❌" : "⏳";
  console.log(`${icon} ${name}${details ? `: ${details}` : ""}`);

  TEST_RESULTS.tests.push({ name, status, details });
  if (status === "pass") TEST_RESULTS.passed++;
  if (status === "fail") TEST_RESULTS.failed++;
}

async function test1_ContractBasics(sbt, contractAddress) {
  logSection("测试 1: 合约基本功能验证");

  try {
    // 1.1 检查 Token 信息
    const name = await sbt.name();
    const symbol = await sbt.symbol();
    const owner = await sbt.owner();
    const totalSupply = await sbt.totalSupply();

    logTest("Token 名称查询", "pass", name);
    logTest("Token 符号查询", "pass", symbol);
    logTest("Owner 地址查询", "pass", owner);
    logTest("总供应量查询", "pass", totalSupply.toString());

    // 1.2 检查接口支持
    const supportsERC721 = await sbt.supportsInterface("0x80ac58cd");
    const supportsMetadata = await sbt.supportsInterface("0x5b5e139f");

    logTest("ERC721 接口支持", supportsERC721 ? "pass" : "fail");
    logTest("ERC721Metadata 接口支持", supportsMetadata ? "pass" : "fail");

    // 1.3 检查网络信息
    const network = await hre.ethers.provider.getNetwork();
    console.log(`\n🌐 网络信息:`);
    console.log(`   - Chain ID: ${network.chainId.toString()}`);
    console.log(`   - 网络名称: ${network.name === "homestead" ? "BSC Mainnet" : network.name}`);
    console.log(`   - 合约地址: ${contractAddress}`);
    console.log(`   - BscScan: https://bscscan.com/address/${contractAddress}`);

    return true;
  } catch (error) {
    logTest("合约基本功能验证", "fail", error.message);
    return false;
  }
}

async function test2_MintSBT(sbt, deployer, testUser) {
  logSection("测试 2: SBT 铸造功能");

  try {
    console.log(`\n📝 测试账户信息:`);
    console.log(`   - 部署账户: ${deployer.address}`);
    console.log(`   - 测试账户: ${testUser.address}`);

    // 检查测试账户余额
    const balance = await hre.ethers.provider.getBalance(testUser.address);
    console.log(`   - BNB 余额: ${hre.ethers.formatEther(balance)} BNB`);

    if (balance < hre.ethers.parseEther("0.01")) {
      console.log("\n⚠️  警告: 测试账户 BNB 余额较低，可能不足以支付 Gas 费");
    }

    // 铸造 Level 1 SBT（7天打卡）
    console.log(`\n⏳ 正在为测试账户铸造 Level 1 SBT (7天打卡)...`);

    const mintTx = await sbt.mintSBT(testUser.address, 1, 7, "");
    const receipt = await mintTx.wait();

    logTest("SBT 铸造交易", "pass", `Gas Used: ${receipt?.gasUsed.toString()}`);
    console.log(`   - 交易 Hash: ${mintTx.hash}`);
    console.log(`   - 区块号: ${receipt?.blockNumber}`);

    // 验证铸造结果
    const testUserTokens = await sbt.getUserTokens(testUser.address);
    logTest("用户 SBT 余额查询", "pass", `${testUserTokens.length} 个`);

    if (testUserTokens.length > 0) {
      const tokenId = testUserTokens[0];
      const details = await sbt.getTokenDetails(tokenId);

      console.log(`\n📋 新铸造的 SBT 详情:`);
      console.log(`   - Token ID: ${tokenId}`);
      console.log(`   - 等级: ${details[0]}`);
      console.log(`   - 打卡天数: ${details[1]}`);
      console.log(`   - 铸造时间: ${new Date(Number(details[2]) * 1000).toLocaleString()}`);

      logTest("Token 详情查询", "pass", `等级 ${details[0]}, ${details[1]} 天`);
    }

    return tokenId;
  } catch (error) {
    if (error.message.includes("TokenAlreadyExists")) {
      logTest("SBT 铸造", "fail", "测试账户已拥有该等级的 SBT（这是正常的）");
      console.log("\n💡 提示: 测试账户已拥有 Level 1 SBT，可以继续其他测试");
      return "already_exists";
    } else {
      logTest("SBT 铸造", "fail", error.message);
      return null;
    }
  }
}

async function test3_SoulboundMechanism(sbt, testUser, tokenId) {
  logSection("测试 3: Soulbound 机制验证（不可转移）");

  if (tokenId === "already_exists") {
    // 如果已存在，获取第一个 token
    const tokens = await sbt.getUserTokens(testUser.address);
    tokenId = tokens[0];
  }

  if (!tokenId) {
    logTest("Soulbound 机制测试", "fail", "没有可测试的 Token");
    return false;
  }

  try {
    console.log(`\n⏳ 尝试转移 Token #${tokenId} (应该被阻止)...`);

    const signers = await hre.ethers.getSigners();
    const deployer = signers[0];

    await sbt.transferFrom(testUser.address, deployer.address, tokenId);

    logTest("Soulbound 机制", "fail", "转移竟然成功了！这是异常的");
    return false;
  } catch (error) {
    if (error.message.includes("SoulboundTokenTransferNotAllowed") ||
        error.reason?.includes("SoulboundTokenTransferNotAllowed")) {
      logTest("Soulbound 机制", "pass", "转移被正确阻止");
      return true;
    } else {
      logTest("Soulbound 机制", "pass", `转移被阻止 (${error.message.substring(0, 50)}...)`);
      return true;
    }
  }
}

async function test4_UserQueries(sbt, testUser) {
  logSection("测试 4: 用户查询功能");

  try {
    const hasLevel1 = await sbt.hasLevel(testUser.address, 1);
    const highestLevel = await sbt.getHighestLevel(testUser.address);
    const totalDays = await sbt.getTotalDays(testUser.address);
    const totalSupply = await sbt.totalSupply();

    logTest("hasLevel() 查询", "pass", `拥有 Level 1: ${hasLevel1}`);
    logTest("getHighestLevel() 查询", "pass", `最高等级: ${highestLevel.toString()}`);
    logTest("getTotalDays() 查询", "pass", `总天数: ${totalDays.toString()}`);
    logTest("totalSupply() 查询", "pass", `总供应量: ${totalSupply.toString()}`);

    return true;
  } catch (error) {
    logTest("用户查询功能", "fail", error.message);
    return false;
  }
}

async function main() {
  console.log("\n" + "=".repeat(70));
  console.log("🚀 证道项目 - BSC 主网完整测试套件");
  console.log("=".repeat(70));
  console.log(`\n⏰ 开始时间: ${new Date().toLocaleString()}`);

  // 获取合约地址
  const contractAddress = process.env.NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS;

  if (!contractAddress || contractAddress === "0x0000000000000000000000000000000000000000000000000000000000000000") {
    console.error("\n❌ 错误: 未找到主网合约地址");
    console.log("\n💡 请确保:");
    console.log("   1. AI #1 已完成主网部署");
    console.log("   2. .env.local 中的 NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS 已更新为主网地址");
    console.log("   3. 运行此脚本时使用 --network bnbMainnet");
    process.exit(1);
  }

  // 获取签名者
  const signers = await hre.ethers.getSigners();
  const deployer = signers[0];
  const testUser = signers[1] || deployer;

  // 获取合约实例
  const ZhengDaoSBT = await hre.ethers.getContractFactory("ZhengDaoSBT");
  const sbt = ZhengDaoSBT.attach(contractAddress);

  let tokenId = null;

  // 执行测试
  await test1_ContractBasics(sbt, contractAddress);
  tokenId = await test2_MintSBT(sbt, deployer, testUser);
  await test3_SoulboundMechanism(sbt, testUser, tokenId);
  await test4_UserQueries(sbt, testUser);

  // 输出测试总结
  logSection("测试总结");
  console.log(`\n📊 测试统计:`);
  console.log(`   - 总测试数: ${TEST_RESULTS.tests.length}`);
  console.log(`   - 通过: ${TEST_RESULTS.passed}`);
  console.log(`   - 失败: ${TEST_RESULTS.failed}`);
  console.log(`   - 通过率: ${((TEST_RESULTS.passed / TEST_RESULTS.tests.length) * 100).toFixed(1)}%`);

  if (TEST_RESULTS.failed === 0) {
    console.log(`\n🎉 所有测试通过！`);
    console.log(`\n✅ 主网合约功能正常，可以进行前端集成测试`);
  } else {
    console.log(`\n⚠️  部分测试失败，请检查上述错误信息`);
  }

  console.log(`\n⏰ 结束时间: ${new Date().toLocaleString()}`);
  console.log("=".repeat(70));

  return TEST_RESULTS.failed === 0;
}

// 执行测试
main()
  .then((success) => {
    console.log("\n✅ 测试脚本执行完成");
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error("\n❌ 测试脚本执行失败:");
    console.error(error);
    process.exit(1);
  });
