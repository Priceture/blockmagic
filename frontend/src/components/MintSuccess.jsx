import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

// get tokenId from mintNFT function
export default function MintSuccess() {
  const { tokenId, setTokenId } = useContext(AppContext);
  const contractAddress = `0xcaA4F1dcC16fb15307C8d3A30DdBf9d5E1123C0d`;
  const handleRedirectToOpensea = (event) => {
    /// ตัว test
    window.location.href =
      "https://opensea.io/assets/ethereum/0xf488a1ac7aadd80755ae4f081a67e1e85820a8c3/1334";
    /// ของจริง
    // window.location.href = `https://testnets.opensea.io/assets/sepolia/${contractAddress}/${tokenId}`;
  };
  const handleRedirectToTokenframe = () => {
    window.location.href = "https://tokenframe.com/";
  };
  return (
    <div>
      <h1>mintSuccess</h1>
      <button className="confirmBtn" onClick={handleRedirectToOpensea}>
        Go to Openseas
      </button>
      <button className="confirmBtn" onClick={handleRedirectToTokenframe}>
        Get your NFT frame
      </button>
    </div>
  );
}
