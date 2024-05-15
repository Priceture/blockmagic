import React, { useState, useEffect } from "react";
import axios from "axios";

function SetPrice() {
  //Set state for 4 price tiers
  const [priceHH, setPriceHH] = useState(0);
  const [priceH, setPriceH] = useState(0);
  const [priceL, setPriceL] = useState(0);
  const [priceLL, setPriceLL] = useState(0);
  const [priceArr, setPriceArr] = useState([0, 0, 0, 0, 0]);
  const [bitcoinPrice, setBitcoinPrice] = useState(0);

  // Get price from coinGecko
  const getPrice = async () => {
    const apiKey = "CG-jg1Lr9hXN99m9hkFgQosKGnT";
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_demo_api_key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const btcPriceInUSD = await response.data.bitcoin.usd;
      console.log("bitcoin price is:", btcPriceInUSD);
      setBitcoinPrice(btcPriceInUSD);
      // return btcPriceInUSD;
    } catch (error) {
      console.error("Error fetching BTC price:", error);
    }
  };
  // Fetch Bitcoin Price when rendering first time
  useEffect(() => {
    getPrice();
  }, []);
  //Handle input percentage%
  const handleChangePriceHH = (event) => {
    setPriceHH(event.target.value);
  };
  const handleChangePriceH = (event) => {
    setPriceH(event.target.value);
  };
  const handleChangePriceL = (event) => {
    setPriceL(event.target.value);
  };
  const handleChangePriceLL = (event) => {
    setPriceLL(event.target.value);
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    let btcPriceHH = bitcoinPrice * (1 + priceHH / 100);
    let btcPriceH = bitcoinPrice * (1 + priceH / 100);
    let btcPriceL = bitcoinPrice * (1 - priceL / 100);
    let btcPriceLL = bitcoinPrice * (1 - priceLL / 100);
    let priceArray = [];
    priceArray.push(btcPriceLL, btcPriceL, bitcoinPrice, btcPriceH, btcPriceHH);
    setPriceArr(() => priceArray);
    console.log(priceArr);
  };
  return (
    <div>
      <div>
        <div>Asset Name</div>
        <div>{`BITCOIN: (BTC)`}</div>
      </div>
      <div>{`Current bitcoin price is ${bitcoinPrice}:USD`}</div>
      <div>Setup Four Price Tiers That Will Trigger NFT To Change Mood</div>
      <form className="priceForm" onSubmit={handleSubmitForm}>
        <div className="pricePoint">
          <span>Higher Price - Tier 1</span>
          <span>+</span>
          <input
            className="priceForm__input"
            type="text"
            placeholder="Enter price here"
            value={priceHH}
            onChange={handleChangePriceHH}
            style={{ color: "black" }}
          ></input>
          <span>%</span>
          <span className="priceForm__calculatedprice">
            {" "}
            ={bitcoinPrice * (1 + priceHH / 100)} USD
          </span>
        </div>
        <div className="pricePoint">
          <span>Higher Price - Tier 2</span>
          <span>+</span>
          <input
            className="priceForm__input"
            type="text"
            placeholder="Enter price here"
            value={priceH}
            onChange={handleChangePriceH}
            style={{ color: "black" }}
          ></input>
          <span>%</span>
          <span className="priceForm__calculatedprice">
            ={bitcoinPrice * (1 + priceH / 100)} USD
          </span>
        </div>
        <div className="pricePoint">
          <span>Current Price</span>
          <span>+</span>
          <div className="priceForm__input">0</div>
          <span className="priceForm__calculatedprice">
            % ={bitcoinPrice} USD
          </span>
        </div>
        <div className="pricePoint">
          <span>Lower Price - Tier 1</span>
          <span>-</span>
          <input
            className="priceForm__input"
            type="text"
            placeholder="Enter price here"
            value={priceL}
            onChange={handleChangePriceL}
            style={{ color: "black" }}
          ></input>
          <span className="priceForm__calculatedprice">
            {" "}
            ={(bitcoinPrice * (100 - priceL)) / 100} USD
          </span>
        </div>
        <div className="pricePoint">
          <span>Lower Price - Tier 2</span>
          <span>-</span>
          <input
            className="priceForm__input"
            type="text"
            placeholder="Enter price here"
            value={priceLL}
            onChange={handleChangePriceLL}
            style={{ color: "black" }}
          ></input>
          <span className="priceForm__calculatedprice">
            {" "}
            ={(bitcoinPrice * (100 - priceLL)) / 100} USD
          </span>
        </div>
        <button className="priceForm_submitBtn" type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
}

export default SetPrice;
