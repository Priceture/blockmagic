import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
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
