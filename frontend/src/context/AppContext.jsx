import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  //Manage 5 NFT images from server
  const [pageCount, setPageCount] = useState(0);
  const [metadataInContext, setMetadataInContext] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [priceArr, setPriceArr] = useState([0, 0, 0, 0, 0]);
  const [tokenId, setTokenId] = useState("");
  const [ipfsUrls, setIpfsUrls] = useState([]);
  const count = 1;

  return (
    <AppContext.Provider
      value={{
        count,
        metadataInContext,
        setMetadataInContext,
        priceArr,
        setPriceArr,
        tokenId,
        setTokenId,
        selectedAsset,
        setSelectedAsset,
        ipfsUrls,
        setIpfsUrls,
        pageCount,
        setPageCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
