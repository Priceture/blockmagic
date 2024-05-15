import "./App.css";
import Router from "./routes/Router";

/// Try with Wallet Connect
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import AppContextProvider from "./context/AppContext";

// 1. Get projectId
const projectId = "9db5fedcd0785dec5947890dfd3bd53f";

// 2. Set chain
const sepolia = {
  chainId: 11155111,
  name: "Sepolia Testnet",
  currency: "SepoliaETH",
  explorerUrl: "https://sepolia.etherscan.io/",
  rpcUrl:
    "https://eth-sepolia.g.alchemy.com/v2/W1UaG3jPy8sk7e1fp39n05xNjzaW9eCQ",
};

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [sepolia],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export default function App() {
  return (
    <div className="app">
      <AppContextProvider>
        <Router />
      </AppContextProvider>
    </div>
  );
}
