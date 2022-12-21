const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const ERC20UpgradeableV1 = await ethers.getContractFactory("ERC20TokenV1");
  const contract = await upgrades.deployProxy(ERC20UpgradeableV1, [], {initializer: "initialize", kind: "transparent"});
  await contract.deployed();

  console.log("Contract deploy to:", contract.address)
}

main();
