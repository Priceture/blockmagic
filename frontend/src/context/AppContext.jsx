import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  //Manage 5 NFT images from server
  const [metadataInContext, setMetadataInContext] = useState(null);
  const [priceArr, setPriceArr] = useState([0, 0, 0, 0, 0]);
  const [tokenId, setTokenId] = useState("");
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
