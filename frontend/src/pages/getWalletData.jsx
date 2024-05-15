import { useWeb3ModalAccount } from "@web3modal/ethers/react";
export default function GetWalletData() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  console.log(
    "user wallet address:",
    address,
    " chainID: ",
    chainId,
    "isConnected: ",
    isConnected
  );
}
