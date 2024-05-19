// test/PriceTureNFT.test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PriceTureNFT", function () {
  let PriceTureNFT;
  let priceTureNFT;
  let owner;
  let addr1;

  beforeEach(async function () {
    PriceTureNFT = await ethers.getContractFactory("PriceTureNFT");
    [owner, addr1] = await ethers.getSigners();

    // Deploy the contract
    priceTureNFT = await PriceTureNFT.deploy(10, "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43");
    await priceTureNFT.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await priceTureNFT.owner()).to.equal(owner.address);
    });
  });

  describe("Mint", function () {
    it("Should mint a new token", async function () {
      const priceTiers = [6700012345678, 7000012345678, 7500012345678, 8000012345678, 8500012345678];
      const metadataJson = [
        {
          "name": "Priceture NFT",
          "description": "Your Price, Your Mood, Your NFT",
          "image": "https://cl.imagineapi.dev/assets/91adea70-4d69-40a9-a2eb-21f41db1ce26/91adea70-4d69-40a9-a2eb-21f41db1ce26.png",
          "attributes": [
            {
              "trait_type": "Feeling",
              "value": "Very Sad"
            }
          ]
        },
        {
          "name": "Priceture NFT",
          "description": "Your Price, Your Mood, Your NFT",
          "image": "https://cl.imagineapi.dev/assets/75a7dfc3-2420-4c3d-94bd-27f5beb6fbb5/75a7dfc3-2420-4c3d-94bd-27f5beb6fbb5.png",
          "attributes": [
            {
              "trait_type": "Feeling",
              "value": "Sad"
            }
          ]
        },
        {
          "name": "Priceture NFT",
          "description": "Your Price, Your Mood, Your NFT",
          "image": "https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/images%2FFD10039A-DF7E-42A8-8987-1B26C7D64CB4.jpg?alt=media",
          "attributes": [
            {
              "trait_type": "Feeling",
              "value": "Normal"
            }
          ]
        },
        {
          "name": "Priceture NFT",
          "description": "Your Price, Your Mood, Your NFT",
          "image": "https://cl.imagineapi.dev/assets/f2338688-942b-4f81-ae2b-3e0016b3a6cd/f2338688-942b-4f81-ae2b-3e0016b3a6cd.png",
          "attributes": [
            {
              "trait_type": "Feeling",
              "value": "Happy"
            }
          ]
        },
        {
          "name": "Priceture NFT",
          "description": "Your Price, Your Mood, Your NFT",
          "image": "https://cl.imagineapi.dev/assets/a43bcc0a-711c-4ebf-9aab-d4fe4ac51c12/a43bcc0a-711c-4ebf-9aab-d4fe4ac51c12.png",
          "attributes": [
            {
              "trait_type": "Feeling",
              "value": "Very Happy"
            }
          ]
        }
      ]
      ;
      
      await priceTureNFT.connect(addr1).safeMint(addr1.address, priceTiers, metadataJson);
      expect(await priceTureNFT.ownerOf(0)).to.equal(addr1.address);
    });

    it("Should update token URI", async function () {
      // Assuming the contract has a function to manually trigger the updateTokenURI function for testing
      await priceTureNFT.updateTokenURI();
      // Add your assertions here
    });
  });
});