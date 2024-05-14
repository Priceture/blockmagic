import React, { useEffect } from "react";
import axios from "axios";
import { getPriceAPI } from "../apis/getPriceAPI";

function SetPrice() {
  // Get price from coinGecko
  const getPrice = async () => {
    const apiKey = "CG-jg1Lr9hXN99m9hkFgQosKGnT";
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_demo_api_key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const btcPriceInUSD = await response.data.bitcoin.usd;
      console.log("bitcoin price is:", btcPriceInUSD);
      //   return btcPriceInUSD;
    } catch (error) {
      console.error("Error fetching BTC price:", error);
    }
  };
  useEffect(() => {
    getPrice();
  }, []);

  return <div>Current bitcoin price is :</div>;
}

export default SetPrice;
