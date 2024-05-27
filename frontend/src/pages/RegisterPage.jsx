import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import SetPrice from "../components/SetPrice";
import ImageUploadForm from "../components/ImageUploadForm";
import GetWalletData from "../components/getWalletData";
import MintNFT from "../components/MintNFT";
import SelectAsset from "../components/SelectAsset";
import MintSuccess from "../components/MintSuccess";
import ProgressBar from "../components/ProgressBar";

function RegisterPage() {
  const { pageCount, setPageCount } = useContext(AppContext);
  return (
    <div className="registerpage">
      <div className="progressBar">
        <ProgressBar pageCount={pageCount} setPageCount={setPageCount} />
      </div>
      <div className="mainContent">
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
