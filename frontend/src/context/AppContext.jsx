import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  //Manage 5 NFT images from server
  const [jsonUrl, setJsonUrl] = useState(null);
  const count = 1;

  return (
    <AppContext.Provider value={{ count, jsonUrl, setJsonUrl }}>
      {children}
    </AppContext.Provider>
  );
}
