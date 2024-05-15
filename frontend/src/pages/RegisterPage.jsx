import React, { useState } from "react";
// import ConnectWallet from "../components/ConnectWallet";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import SetPrice from "./SetPrice";
import ImageUploadForm from "../components/ImageUploadForm";
import GetWalletData from "./getWalletData";
import MintNFT from "../components/MintNFT";

function RegisterPage() {
  const [pageCount, setPageCount] = useState(0);
  return (
    <div>
      <h1>Setup your wallet</h1>
      <w3m-button />
      <GetWalletData />
      <SetPrice />
      <ImageUploadForm />
      <MintNFT />
    </div>
  );
}

export default RegisterPage;
