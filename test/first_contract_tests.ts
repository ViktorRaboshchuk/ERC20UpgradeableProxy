import { expect } from "chai";
import { HomeToken } from "../typechain-types";
import hre from "hardhat";
const { network, ethers } = require("hardhat");
const { expect } = require("chai");
import type { SignerWithAddress   } from "@nomiclabs/hardhat-ethers/signers";


describe("ERC20TokenV1", function () {
  let erc20Token: ERC20;
  let owner: SignerWithAddress
  let addr1: SignerWithAddress
  let addr2: SignerWithAddress

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const ERC20Token = await hre.ethers.getContractFactory("ERC20TokenV1", {signer: owner});
    erc20Token = await upgrades.deployProxy(ERC20Token, [], { initializer: 'initialize', kind: 'transparent'});
    await erc20Token.deployed();
  });


  describe("Check contract constructor", () => {
    it("Should mint 0 amount of tokens", async function () {
      const balance = await erc20Token.balanceOf(owner.address);
      expect(await balance).to.equal(0);
    });

    it("Check contract token name", async function () {
      const token_name = "MaticToken";
      console.log(await erc20Token.name());
      expect(await erc20Token.name()).to.equal(token_name);
    });

    it("Check contract token symbol", async function () {
      const token_symbol = "MTK";
      expect(await erc20Token.symbol()).to.equal(token_symbol);
    });

    it("Check contract total supply", async function () {
      expect(await erc20Token.totalSupply()).to.equal(0);
    });

    it("Check mint with owner address equal to zero", async function () {
      expect(erc20Token.mint(ethers.constants.AddressZero, 1000)).to.be.revertedWith('ERC20: mint address equal to zero');
    });

    it("Check mint with separate address", async function () {
      expect(erc20Token.connect(addr1).mint(addr1.address, 1000)).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it("Run initialize one more time causes an error", async function () {
      expect(erc20Token.initialize()).to.be.revertedWith('Initializable: contract is already initialized');
    });

  });

});
