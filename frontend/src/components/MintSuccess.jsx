import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function MintSuccess() {
  const { tokenId } = useContext(AppContext);
  const contractAddress = `0xF5d4F62Ea2Eb520d6b854Eb910d6605Fc59631E8`;
  const handleRedirectToOpensea = () => {
    window.open(
      `https://testnets.opensea.io/assets/amoy/${contractAddress}/${tokenId}`,
      "_blank"
    );
  };
  const handleRedirectToTokenframe = () => {
    window.open("https://tokenframe.com/", "_blank");
  };
  return (
    <div>
      <div className="mainContent__header">
        <div className="mainContent__header-stepname">
          Congratulations! Your NFTs has been minted 🥳🥳
        </div>
        <div className="mainContent__header-explain">
          Next go get the NFT Frame to hang in your home or gallery <br />
          Enjoy!
        </div>
      </div>
      <div className="flex flex-row p-10 justify-center gap-4">
        <button className="confirmBtn" onClick={handleRedirectToOpensea}>
          ↗ Check it on Opensea
        </button>
        <button
          className="confirmBtn-ghost"
          onClick={handleRedirectToTokenframe}
        >
          ↗ Hang your NFT frame
        </button>
      </div>
    </div>
  );
}
