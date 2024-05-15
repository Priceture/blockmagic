require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/hardhat-chainlink");
require("./tasks");
require("dotenv").config();

const COMPILER_SETTINGS = {
  optimizer: {
      enabled: true,
      runs: 1000000,
  },
  metadata: {
      bytecodeHash: "none",
  },
}

const MAINNET_RPC_URL =
    process.env.MAINNET_RPC_URL ||
    process.env.ALCHEMY_MAINNET_RPC_URL ||
    "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const POLYGON_MAINNET_RPC_URL =
    process.env.POLYGON_MAINNET_RPC_URL || "https://polygon-mainnet.alchemyapi.io/v2/your-api-key"
const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL;
const MUMBAI_RPC_URL =
    process.env.MUMBAI_RPC_URL || "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY

// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key"
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "Your polygonscan API key"
const REPORT_GAS = process.env.REPORT_GAS || false

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  chainlink: {
    confirmations: 1, // Number of confirmations to wait for transactions, default: 1
  },
  networks: {
    hardhat: {
        hardfork: "merge",
        // If you want to do some forking set `enabled` to true
        forking: {
            url: MAINNET_RPC_URL,
            blockNumber: FORKING_BLOCK_NUMBER,
            enabled: false,
        },
        chainId: 31337,
    },
    localhost: {
        chainId: 31337,
    },
    sepolia: {
        url: SEPOLIA_RPC_URL !== undefined ? SEPOLIA_RPC_URL : "",
        accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        //   accounts: {
        //     mnemonic: MNEMONIC,
        //   },
        chainId: 11155111,
    },
    mainnet: {
        url: MAINNET_RPC_URL,
        accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        //   accounts: {
        //     mnemonic: MNEMONIC,
        //   },
        chainId: 1,
    },
    polygon: {
        url: POLYGON_MAINNET_RPC_URL,
        accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        chainId: 137,
    },
    mumbai: {
        url: MUMBAI_RPC_URL,
        accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        chainId: 80001,
    },
},
defaultNetwork: "hardhat",
etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
        // npx hardhat verify --list-networks
        sepolia: ETHERSCAN_API_KEY,
        mainnet: ETHERSCAN_API_KEY,
        polygon: POLYGONSCAN_API_KEY,
        polygonMumbai: POLYGONSCAN_API_KEY,
    },
},
gasReporter: {
    enabled: REPORT_GAS,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
},
contractSizer: {
    runOnCompile: false,
    only: [
        "Nft",
        "Price"
    ],
},
paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./build/cache",
    artifacts: "./build/artifacts",
},
mocha: {
    timeout: 300000, // 300 seconds max for running tests
},
};
