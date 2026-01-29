const hre = require("hardhat");

/**
 * 查询 NFT 的 Token URI 和元数据
 */

async function main() {
  const contractAddress = "0x86e0392575cBb9BEEfF32Eb62De5923B05f66B94";
  const tokenId = 2;

  console.log("🔍 查询 NFT 元数据...\n");
  console.log("📍 合约地址:", contractAddress);
  console.log("🆔 Token ID:", tokenId);
  console.log("");

  const sbt = await hre.ethers.getContractAt("ZhengDaoSBT", contractAddress);

  try {
    // 获取 Token URI
    const tokenURI = await sbt.tokenURI(tokenId);
    console.log("📄 Token URI:", tokenURI);
    console.log("");

    // 如果是 HTTP(S) 链接，尝试获取元数据
    if (tokenURI.startsWith("http")) {
      console.log("⏳ 正在获取元数据...");
      try {
        const response = await fetch(tokenURI);
        const metadata = await response.json();
        console.log("📋 元数据:");
        console.log(JSON.stringify(metadata, null, 2));
        console.log("");

        if (metadata.image) {
          console.log("🖼️  图片 URL:", metadata.image);
          console.log("");

          // 检查图片是否可访问
          console.log("⏳ 检查图片是否可访问...");
          try {
            const imgResponse = await fetch(metadata.image, { method: "HEAD" });
            console.log("   状态码:", imgResponse.status);
            if (imgResponse.ok) {
              console.log("   ✅ 图片可以访问");
            } else {
              console.log("   ❌ 图片无法访问");
            }
          } catch (error) {
            console.log("   ❌ 图片访问失败:", error.message);
          }
        }
      } catch (error) {
        console.error("❌ 获取元数据失败:", error.message);
      }
    } else {
      console.log("💡 Token URI 不是 HTTP 链接，无法获取元数据");
    }

  } catch (error) {
    console.error("❌ 查询失败:");
    console.error(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
