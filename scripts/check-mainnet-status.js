const { ethers } = require("hardhat");

/**
 * 快速检查主网部署状态
 * 用途: 在测试前验证主网合约是否已部署且可访问
 */

async function main() {
  console.log("\n" + "=".repeat(70));
  console.log("🔍 证道项目 - BSC 主网部署状态检查");
  console.log("=".repeat(70));
  console.log("");

  // 从环境变量获取合约地址
  const contractAddress = process.env.NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS;

  if (!contractAddress || contractAddress === "0x0000000000000000000000000000000000000000000000000000000000000000") {
    console.log("❌ 状态: 主网合约地址未配置");
    console.log("");
    console.log("💡 所需操作:");
    console.log("   1. 等待 AI #1 完成主网部署");
    console.log("   2. 确认 .env.local 中的 NEXT_PUBLIC_ZHENGDAO_SBT_ADDRESS 已更新");
    console.log("   3. 确认 NEXT_PUBLIC_BNB_CHAIN_TESTNET=false（主网模式）");
    console.log("");
    console.log("⏳ 当前状态: 等待主网部署...");
    return;
  }

  console.log("📍 合约地址:", contractAddress);
  console.log("🔗 BscScan: https://bscscan.com/address/" + contractAddress);
  console.log("");

  try {
    // 连接到主网合约
    const ZhengDaoSBT = await ethers.getContractFactory("ZhengDaoSBT");
    const sbt = ZhengDaoSBT.attach(contractAddress);

    // 检查基本功能
    console.log("⏳ 正在验证合约...");

    const name = await sbt.name();
    const symbol = await sbt.symbol();
    const owner = await sbt.owner();
    const totalSupply = await sbt.totalSupply();

    console.log("");
    console.log("✅ 状态: 主网合约已部署且可访问");
    console.log("");
    console.log("📋 合约信息:");
    console.log("   - Token 名称:", name);
    console.log("   - Token 符号:", symbol);
    console.log("   - 合约 Owner:", owner);
    console.log("   - 总供应量:", totalSupply.toString());
    console.log("");

    // 检查网络配置
    const network = await ethers.provider.getNetwork();
    console.log("🌐 网络信息:");
    console.log("   - Chain ID:", network.chainId.toString());
    console.log("   - 网络名称:", network.name === "homestead" ? "BSC Mainnet" : network.name);
    console.log("");

    if (network.chainId.toString() === "56") {
      console.log("✅ 网络配置正确: BSC 主网 (Chain ID: 56)");
      console.log("");
      console.log("🚀 准备就绪! 可以开始执行主网测试");
      console.log("");
      console.log("💡 下一步操作:");
      console.log("   运行测试: npx hardhat run scripts/test-mint-sbt.js --network bnbMainnet");
    } else if (network.chainId.toString() === "97") {
      console.log("⚠️  警告: 当前连接到 BSC 测试网 (Chain ID: 97)");
      console.log("");
      console.log("💡 所需操作:");
      console.log("   1. 更新 .env.local: NEXT_PUBLIC_BNB_CHAIN_TESTNET=false");
      console.log("   2. 或者运行测试时指定主网: --network bnbMainnet");
    } else {
      console.log("❌ 错误: 未知的网络配置");
    }

  } catch (error) {
    console.log("❌ 状态: 主网合约无法访问");
    console.log("");
    console.log("错误信息:", error.message);
    console.log("");
    console.log("💡 可能的原因:");
    console.log("   1. 合约尚未部署到主网");
    console.log("   2. 合约地址配置错误");
    console.log("   3. 网络连接问题");
    console.log("");
    console.log("⏳ 当前状态: 等待主网部署...");
  }

  console.log("");
  console.log("=".repeat(70));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ 状态检查失败:");
    console.error(error);
    process.exit(1);
  });
