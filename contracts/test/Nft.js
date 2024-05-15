const { expect } = require("chai");

describe("Nft", function () {
    let nft;

    beforeEach(async function () {
        const Nft = await ethers.getContractFactory("Nft");
        nft = await Nft.deploy();
        await nft.deployed();
    });

    it("should have a name", async function () {
        const name = await nft.name();
        expect(name).to.equal("Your NFT Name");
    });

    it("should have a symbol", async function () {
        const symbol = await nft.symbol();
        expect(symbol).to.equal("NFT");
    });

    // Add more test cases here

});