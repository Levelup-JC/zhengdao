const hre = require("hardhat");

/**
 * 测试 Soulbound 机制（不可转移）
 */

async function main() {
  console.log("\n" + "=".repeat(70));
  console.log("🧪 测试 Soulbound 机制");
  console.log("=".repeat(70));

  const contractAddress = process.env.NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS;
  console.log(`\n📍 合约地址: ${contractAddress}`);

  const signers = await hre.ethers.getSigners();
  const deployer = signers[0];

  const ZhengDaoSBT = await hre.ethers.getContractFactory("ZhengDaoSBT");
  const sbt = ZhengDaoSBT.attach(contractAddress);

  // 获取用户的现有 Token
  const userTokens = await sbt.getUserTokens(deployer.address);
  console.log(`📝 用户拥有的 Token 数量: ${userTokens.length}`);

  if (userTokens.length === 0) {
    console.log("❌ 没有 Token 可测试");
    process.exit(1);
  }

  const tokenId = userTokens[0];
  console.log(`🔍 测试 Token ID: ${tokenId}`);

  // 尝试转移（应该失败）
  console.log(`\n⏳ 尝试转移 Token #${tokenId}...`);

  try {
    // 尝试转移给自己（测试 Soulbound 机制）
    await sbt.transferFrom(deployer.address, deployer.address, tokenId);
    console.log("❌ Soulbound 机制失效！转移竟然成功了！");
    process.exit(1);
  } catch (error) {
    console.log("✅ Soulbound 机制正常！转移被正确阻止");
    console.log(`   错误信息: ${error.message.substring(0, 100)}...`);
  }

  console.log("\n" + "=".repeat(70));
  console.log("🎉 Soulbound 机制测试通过！");
  console.log("=".repeat(70));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
