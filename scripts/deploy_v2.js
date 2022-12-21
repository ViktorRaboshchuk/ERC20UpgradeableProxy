const { ethers, upgrades } = require("hardhat");

async function main() {
  const ERC20UpgradeableV2 = await ethers.getContractFactory("ERC20TokenV2");
  console.log("Upgrading ERC20UpgradableV1...");
  await upgrades.upgradeProxy("0x38f6bB398b8742e0670382BF265B4f4843e84aFa", ERC20UpgradeableV2);
  console.log("Upgraded successfully");
}

main();
