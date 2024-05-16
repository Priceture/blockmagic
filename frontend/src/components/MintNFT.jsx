import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

function MintNFT() {
  const { metadataInContext, setMetadataInContext } = useContext(AppContext);

  return (
    <div>
      {metadataInContext ? (
        <div>
          <h1>Preview your NFT</h1>
          <div>
            {metadataInContext.file.map((item, index) => (
              <div key={index}>
                <p>{item.attributes[0].trait_type}: {item.attributes[0].value}</p>
                <img src={item.image} className='final_image' alt="NFT" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Metadata is not available</div>
      )}
    </div>
  );
}

export default MintNFT;
