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
      {pageCount === 0 ? (
        <GetWalletData pageCount={pageCount} setPageCount={setPageCount} />
      ) : pageCount === 1 ? (
        <SetPrice pageCount={pageCount} setPageCount={setPageCount} />
      ) : pageCount === 2 ? (
        <ImageUploadForm pageCount={pageCount} setPageCount={setPageCount} />
      ) : (
        <MintNFT pageCount={pageCount} setPageCount={setPageCount} />
      )}
    </div>
  );
}

export default RegisterPage;
