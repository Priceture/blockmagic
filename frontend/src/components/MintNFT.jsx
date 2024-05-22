import React, { useContext, useEffect, useState } from "react";
// import { ethers } from "ethers";
import { AppContext } from "../context/AppContext";
import { Button } from "@mui/material";

function MintNFT({ pageCount, setPageCount }) {
  const { metadataInContext, setMetadataInContext } = useContext(AppContext);
  const { priceArr, setPriceArr, tokenId, setTokenId } = useContext(AppContext);
  const metadata = {
    file: [
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://cl.imagineapi.dev/assets/133f4b9c-bd1e-484d-8f0e-fa1db84d07a5/133f4b9c-bd1e-484d-8f0e-fa1db84d07a5.png",
        attributes: [{ trait_type: "Feeling", value: "Very Sad" }],
      },
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://cl.imagineapi.dev/assets/15d7ff3e-42b3-468f-b451-850959bb28ed/15d7ff3e-42b3-468f-b451-850959bb28ed.png",
        attributes: [{ trait_type: "Feeling", value: "Sad" }],
      },
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/images%2FIMG_1057.JPG?alt=media",
        attributes: [{ trait_type: "Feeling", value: "Normal" }],
      },
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://cl.imagineapi.dev/assets/3655b102-37ba-4cff-8475-d035b7603ef2/3655b102-37ba-4cff-8475-d035b7603ef2.png",
        attributes: [{ trait_type: "Feeling", value: "Happy" }],
      },
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://cl.imagineapi.dev/assets/7e3cfd26-ed22-48fd-a7e5-bb0adac66107/7e3cfd26-ed22-48fd-a7e5-bb0adac66107.png",
        attributes: [{ trait_type: "Feeling", value: "Very Happy" }],
      },
    ],
  };
  // setMetadataInContext(metadata);
  const handleMintNFT = async (event) => {
    // call function to mint NFT - SON DO THIS
    // await >> Should return token ID
    // setTokenId() เอาค่า tokenID มา setTokenID
    setPageCount(pageCount + 1);
  };

  return (
    <div>
      <div className="mainContent__header">
        <div className="mainContent__header-stepname">Step 5: Mint NFT</div>
        <div className="mainContent__header-explain">
          Confirm your images and click "Mint NFT" to get your NFT to your
          wallet. <br /> This process costs gas fee.
        </div>
      </div>
      <div className="mainContent__body">
        <div>
          {metadataInContext ? (
            <div>
              <h1>Preview your NFT</h1>
              <div>
                {metadataInContext.file.map((item, index) => (
                  <div key={index}>
                    <p>
                      {item.attributes[0].trait_type}:{" "}
                      {item.attributes[0].value}
                    </p>
                    <img src={item.image} className="final_image" alt="NFT" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>Metadata is not available</div>
          )}
        </div>
      </div>
      <div className="mainContent__footer">
        <Button
          nClick={handleMintNFT}
          color="inherit"
          className="button"
          sx={{
            color: "#400e32",
            backgroundColor: "#F2cd5C",
            width: "200px",
            height: "48px",
          }}
        >
          {" "}
          Mint NFT
        </Button>
      </div>
    </div>
  );
}

export default MintNFT;
