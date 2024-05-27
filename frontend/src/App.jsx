import "./App.css";
import Router from "./routes/Router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import AppContextProvider from "./context/AppContext";

const projectId = "9db5fedcd0785dec5947890dfd3bd53f";
const sepolia = {
  chainId: 11155111,
  name: "Sepolia Testnet",
  currency: "SepoliaETH",
  explorerUrl: "https://sepolia.etherscan.io/",
  rpcUrl:
    "https://eth-sepolia.g.alchemy.com/v2/W1UaG3jPy8sk7e1fp39n05xNjzaW9eCQ",
};

const amoy = {
  chainId: 80002,
  name: "Polygon Amoy Testnet",
  currency: "MATIC",
  explorerUrl: "https://amoy.polygonscan.com/",
  rpcUrl: "https://rpc-amoy.polygon.technology/",
};

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
  chains: [amoy],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  size: "md",
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#f2cd5c",
    "--w3m-color-mix": "#f2cd5c",
    "--w3m-color-mix-strength": 40,
  },
});

///=== Setup MUI theme context provider
const theme = createTheme({
  palette: {
    primary: {
      main: "#f2cd5c",
      contrastText: "#fff",
    },
    secondary: {
      main: "#400e32",
      light: "#a61f69",
      contrastText: "#fff",
    },
    text: {
      primary: "#fff",
      secondary: "#aaa",
    },
  },
});

export default function App() {
  return (
    <div className="app">
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </AppContextProvider>
    </div>
  );
}
