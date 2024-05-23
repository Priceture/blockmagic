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
      <div className="mainContent__header">
        <div className="mainContent__header-stepname">
          Congratulations! Your NFT is Ready In Your Wallet!🥳🥳
        </div>
        <div className="mainContent__header-explain">
          You can check your NFT on OpenSea or Get the NFT physical fram to hang
          this special NFT in your home or gallery. <br />
          Enjoy!
        </div>
      </div>
      <div className="flex flex-row p-10 justify-center gap-4">
        <button className="confirmBtn" onClick={handleRedirectToOpensea}>
          Go to Openseas
        </button>
        <button
          className="confirmBtn-ghost"
          onClick={handleRedirectToTokenframe}
        >
          Get your NFT frame
        </button>
      </div>
    </div>
  );
}
