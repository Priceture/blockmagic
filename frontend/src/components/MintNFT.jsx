import React, { useContext, useEffect, useState } from "react";
// import { ethers } from "ethers";
import { AppContext } from "../context/AppContext";

function MintNFT({ pageCount, setPageCount }) {
  const { metadataInContext, setMetadataInContext } = useContext(AppContext);
  const { priceArr, setPriceArr, tokenId, setTokenId } = useContext(AppContext);
  // const [contract, setContract] = useState(null);
  // const network = "Sepolia";

  // useEffect(() => {
  //   //Connect to Sepolia network
  //   const provider = new ethers.BrowserProvider(window.ethereum);
  //   // Connect to the deployed contract using its address and ABI
  //   const mintNFTContract = new ethers.Contract(
  //     "0xcaA4F1dcC16fb15307C8d3A30DdBf9d5E1123C0d",
  //     abi,
  //     provider
  //   );
  //   setContract(mintNFTContract);
  //   //Listen for events
  // }, []);
  // //Function to call smartcontract to mint NFT
  // // 1. create smc
  // // 2. call smc
  // const handleMintNFT = async () => {
  //   if (contract) {
  //     const response = await contract.safeMint(); //replare with mint function inside the contract + input price objects when calling the function
  //     console.log("result from minting", response);
  //   }
  // };

  const handleMintNFT = async (event) => {
    // call function to mint NFT - SON DO THIS
    // await >> Should return token ID
    // setTokenId() เอาค่า tokenID มา setTokenID
    setPageCount(pageCount + 1);
  };

  return (
    <div>
      <div>
        {metadataInContext ? (
          <div>
            <h1>Preview your NFT</h1>
            <div>
              {metadataInContext.file.map((item, index) => (
                <div key={index}>
                  <p>
                    {item.attributes[0].trait_type}: {item.attributes[0].value}
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
      <button onClick={handleMintNFT}>Mint NFT</button>
    </div>
  );
}

export default MintNFT;
