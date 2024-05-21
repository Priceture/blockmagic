import React, { useState } from "react";
// import ConnectWallet from "../components/ConnectWallet";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import SetPrice from "../components/SetPrice";
import ImageUploadForm from "../components/ImageUploadForm";
import GetWalletData from "../components/getWalletData";
import MintNFT from "../components/MintNFT";
import SelectAsset from "../components/SelectAsset";
import MintSuccess from "../components/MintSuccess";
import ProgressBar from "../components/ProgressBar";

//Note: เอา pageCount ไปเซ็ตเป็น context สำหรับ register page ทีหลัง
function RegisterPage() {
  const [pageCount, setPageCount] = useState(0);
  return (
    <div>
      <ProgressBar pageCount={pageCount} setPageCount={setPageCount} />
      <div>
        {pageCount === 0 ? (
          <GetWalletData pageCount={pageCount} setPageCount={setPageCount} />
        ) : pageCount === 1 ? (
          <ImageUploadForm pageCount={pageCount} setPageCount={setPageCount} />
        ) : pageCount === 2 ? (
          <SelectAsset pageCount={pageCount} setPageCount={setPageCount} />
        ) : pageCount === 3 ? (
          <SetPrice pageCount={pageCount} setPageCount={setPageCount} />
        ) : pageCount === 4 ? (
          <MintNFT pageCount={pageCount} setPageCount={setPageCount} />
        ) : pageCount === 5 ? (
          <MintSuccess pageCount={pageCount} setPageCount={setPageCount} />
        ) : null}
      </div>
    </div>
  );
}

export default RegisterPage;
