import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

// get tokenId from mintNFT function
export default function MintSuccess() {
  const { tokenId, setTokenId } = useContext(AppContext);
  const contractAddress = `0x250f36675270D24E00d090712Cd8825A447bBD8C`;
  const handleRedirectToOpensea = (event) => {
    /// ตัว test
    window.location.href =
      "https://testnets.opensea.io/assets/amoy/0xfd51ab165d3253c08eaf085b48bd5900c69cf706:2";
    /// ของจริง
    // window.location.href = `https://testnets.opensea.io/assets/amoy/0xfd51ab165d3253c08eaf085b48bd5900c69cf706:${tokenId}`;
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
