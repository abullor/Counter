import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();

    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    return { counter, owner };
  }

  describe("Deployment", function () {
    it("Should start with zero", async function () {
      const { counter, owner } = await loadFixture(deploy);

      expect(await counter.get()).to.equal(0);
    });
  });

  describe("Operations", function () {
    it("Should be 1 after one increment", async function () {
      const { counter, owner } = await loadFixture(deploy);

      expect(await counter.get()).to.equal(0);

      await counter.inc();

      expect(await counter.get()).to.equal(1);
    });

    it("Should be 0 after one increment and one decrement", async function () {
      const { counter, owner } = await loadFixture(deploy);

      expect(await counter.get()).to.equal(0);

      await counter.inc();

      expect(await counter.get()).to.equal(1);

      await counter.dec();

      expect(await counter.get()).to.equal(0);
    });
  });
});