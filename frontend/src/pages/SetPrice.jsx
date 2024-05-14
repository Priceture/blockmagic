import React, { useState, useEffect } from "react";
import axios from "axios";
import { getPriceAPI } from "../apis/getPriceAPI";

function SetPrice() {
  //Set state for 4 price tiers
  const [priceHH, setPriceHH] = useState(0);
  const [priceH, setPriceH] = useState(0);
  const [priceL, setPriceL] = useState(0);
  const [priceLL, setPriceLL] = useState(0);
  const [bitcoinPrice, setBitcoinPrice] = useState(0);

  // Get price from coinGecko
  const getPrice = async () => {
    const apiKey = "CG-jg1Lr9hXN99m9hkFgQosKGnT";
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_demo_api_key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const btcPriceInUSD = await response.data.bitcoin.usd;
      console.log("bitcoin price is:", btcPriceInUSD);
      return btcPriceInUSD;
    } catch (error) {
      console.error("Error fetching BTC price:", error);
    }
  };

  useEffect(() => {
    const btcPrice = getPrice();
    setBitcoinPrice(btcPrice);
  }, []);
  const handleChangePriceHH = (event) => {
    setPriceHH(event.target.value);
  };
  return (
    <div>
      <div>{`Current bitcoin price is ${bitcoinPrice}:USD`}</div>
      <form>
        <input
          type="text"
          placeholder="Enter price here"
          value={priceHH}
          onChange={handleChangePriceHH}
          style={{ color: "black" }}
        ></input>
        <span>{(bitcoinPrice * priceHH) / 100}</span>
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
}

export default SetPrice;
