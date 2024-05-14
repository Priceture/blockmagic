import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  //Function ที่เอาไว้ redirect to register page
  const navigate = useNavigate();
  const goToRegisterPage = () => {
    navigate("register");
  };
  const count = 1;

  return (
    <AppContext.Provider value={{ goToRegisterPage, count }}>
      {children}
    </AppContext.Provider>
  );
}
