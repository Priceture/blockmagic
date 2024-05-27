## Compile and Deploy

We use Remix Ethereum as a tool for testing, compiling, and deploying our smart contract.
You can try compile and deploy here.

[Open in Remix](https://remix.ethereum.org/#version=soljson-v0.8.25+commit.b61c2a91.js&optimize=false&runs=200&gist=c87117db4e36bdae65b41f86939ad0b2)

## Chainlink Code

At [/contracts/Nft.sol](Nft.sol)
- Line 75: we use price feed to get the latest price of selected asset to update state on that tokenId
- Line 96: we use checkUpkeep with Automation to update the NFT metadata every 30 mins

## Deployed Contract

- Polygon Amoy Testnet: [0xF5d4F62Ea2Eb520d6b854Eb910d6605Fc59631E8](https://amoy.polygonscan.com/address/0xf5d4f62ea2eb520d6b854eb910d6605fc59631e8)
- Chainlink Automation: [0x50cc4ce7b707c3fbc0edbf459bcdb71fa990554c](https://amoy.polygonscan.com/address/0x50cc4ce7b707c3fbc0edbf459bcdb71fa990554c)