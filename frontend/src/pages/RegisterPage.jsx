import React, { useState } from "react";
// import ConnectWallet from "../components/ConnectWallet";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import SetPrice from "../components/SetPrice";
import ImageUploadForm from "../components/ImageUploadForm";
import GetWalletData from "../components/getWalletData";
import MintNFT from "../components/MintNFT";
import SelectAsset from "../components/SelectAsset";

//Note: เอา pageCount ไปเซ็ตเป็น context สำหรับ register page ทีหลัง
function RegisterPage() {
  const [pageCount, setPageCount] = useState(0);
  return (
    <div>
      {pageCount === 0 ? (
        <GetWalletData pageCount={pageCount} setPageCount={setPageCount} />
      ) : pageCount === 1 ? (
        <SelectAsset pageCount={pageCount} setPageCount={setPageCount} />
      ) : pageCount === 2 ? (
        <SetPrice pageCount={pageCount} setPageCount={setPageCount} />
      ) : pageCount === 3 ? (
        <ImageUploadForm pageCount={pageCount} setPageCount={setPageCount} />
      ) : (
        <MintNFT pageCount={pageCount} setPageCount={setPageCount} />
      )}
    </div>
  );
}

export default RegisterPage;
