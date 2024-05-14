import React from "react";
// import ConnectWallet from "../components/ConnectWallet";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import SetPrice from "./SetPrice";

// Function to get wallet data from user
// ถ้ารันรอบแรกจะยังไม่มีค่า ต้องให้ user login ก่อนถึงจะได้ค่ามา
// ถ้ามีค่าแล้วให้ไปยัง step ถัดไป
function GetWalletData() {
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
function RegisterPage() {
  return (
    <div>
      <h1>Setup your wallet</h1>
      <w3m-button />
      <GetWalletData />
      <SetPrice />
    </div>
  );
}

export default RegisterPage;
