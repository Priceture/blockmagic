import React from "react";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function MintSuccess() {
  const handleRedirectToOpensea = (event) => {};
  return (
    <div>
      <h1>mintSuccess</h1>
      <button onClick={handleRedirectToOpensea}>Go to Openseas</button>
      <button>Get your NFT frame</button>
    </div>
  );
}
