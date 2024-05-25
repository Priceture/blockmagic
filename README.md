<p align="center" width="100%">
    <img width="100%" src="https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/PricetureCover.png?alt=media"> 
</p>


# Priceture
Your price, your mood, your NFT.
Transform your art into a mood-reflective masterpiece that shifts with the emotional currents you care about - prices, sports teams, and more.

> Try our product at [here](https://priceture.com)

## Introduction

Imagine stepping into an art gallery or your own home, where every hanging image mirrors your emotions for the day. Cool, right? Priceture makes this concept a reality.

Priceture’s main features allow users to upload their own images and select emotionally significant elements—whether it’s the price of Bitcoin or their favorite basketball team. These images then transform into dynamic NFTs, with AI generating variations that reflect both happy and sad moods.

As real-world situations evolve, so do these NFTs. Powered by Chainlink Pricefeed and Automation, Priceture brings a new dimension to art and emotion.

## How It Works
<p align="center" width="50%">
    <img width="50%" src="https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/Priceture%20Flow%20Updated.png?alt=media"> 
</p>

1. User connects wallet.
2. User uploads their favorite image, it could be art or family photo or selfie.
3. The app will store on Firebase and call API to Midjourney to generate images with different moods. Then upload to IPFS in JSON format.
4. User selects their favorite asset (BTC or ETH or LINK)
5. User setups conditions for triggers of dynamic NFT
6. User mints dynamicNFT.
7. The Chainlink automation will check every 30 minutes that if the price has hit the trigger points (price tiers) or not, if it hits, the JSON metadata of NFT will change their mood.

## Project Structure

The project has 2 folders
1. `contracts`: contains the smart contract
2. `frontend` : contains the frontend app including API to IPFS and Midjourney

## Smart Contracts

The smart contract is written in Solidity on Remix. The contract is deployed on Polygon Amoy Testnet.
The contract is using Chainlink's pricefeed to get the latest price on the selected assets (BTC/USD, ETH/USD, LINK/USD) and Chainlink's automation time-based for triggering the function inside the smart contract every 30 minutes.

## Deployed Contract

- Polygon Amoy Testnet: [0xF5d4F62Ea2Eb520d6b854Eb910d6605Fc59631E8](https://amoy.polygonscan.com/address/0xf5d4f62ea2eb520d6b854eb910d6605fc59631e8)
- Chainlink Automation: [0x50cc4ce7b707c3fbc0edbf459bcdb71fa990554c](https://amoy.polygonscan.com/address/0x50cc4ce7b707c3fbc0edbf459bcdb71fa990554c)
