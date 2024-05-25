import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { Button } from "@mui/material";

function SetPrice({ pageCount, setPageCount }) {
  //Set state for 4 price tiers
  const [priceHH, setPriceHH] = useState(0);
  const [priceH, setPriceH] = useState(0);
  const [priceL, setPriceL] = useState(0);
  const [priceLL, setPriceLL] = useState(0);
  // const [priceArr, setPriceArr] = useState([0, 0, 0, 0, 0]);
  const [bitcoinPrice, setBitcoinPrice] = useState(0);
  const { priceArr, setPriceArr, selectedAsset, setSelectedAsset } =
    useContext(AppContext);

  // Get price from coinGecko
  const getPrice = async () => {
    const apiKey = "CG-jg1Lr9hXN99m9hkFgQosKGnT";
    //Bitcoin price:
    // const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_demo_api_key=${apiKey}`;
    //Eth price:
    // const url = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&x_cg_demo_api_key=${apiKey}`;
    //Chainlink price
    // ("https://api.coingecko.com/api/v3/simple/price?ids=chainlink&vs_currencies=usd");
    // configure url by selected asset
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${selectedAsset}&vs_currencies=usd&x_cg_demo_api_key=${apiKey}`;
    try {
      const response = await axios.get(url);
      // const btcPriceInUSD = await response.data.bitcoin.usd;
      const btcPriceInUSD = await response.data[selectedAsset].usd;
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
    let btcPriceHH = Math.trunc(bitcoinPrice * (1 + priceHH / 100) * 10 ** 8);
    let btcPriceH = Math.trunc(bitcoinPrice * (1 + priceH / 100) * 10 ** 8);
    let btcPriceCurrent = Math.trunc(bitcoinPrice * 10 ** 8);
    let btcPriceL = Math.trunc(bitcoinPrice * (1 - priceL / 100) * 10 ** 8);
    let btcPriceLL = Math.trunc(bitcoinPrice * (1 - priceLL / 100) * 10 ** 8);
    let priceArray = [];
    priceArray.push(
      btcPriceLL,
      btcPriceL,
      btcPriceCurrent,
      btcPriceH,
      btcPriceHH
    );
    setPriceArr(() => priceArray);
    setPageCount(pageCount + 1);
  };
  return (
    <div>
      <div className="mainContent__header">
        <div className="mainContent__header-stepname">
          Step 4: Set Conditions
        </div>
        <div className="mainContent__header-explain">
          Your NFT will change the mood based on the conditions below
        </div>
      </div>
      <div className="mainContent__setPrice">
        <div className="">
          <div className="mainContent_body-title">Your selected assets</div>
        </div>
        <div className="mainContent_setPrice-container">
          <div className="setPrice__subcontainer_head">
            <div className="setPrice__subcontainer-item">Asset Name</div>
            <div className="setPrice__subcontainer-item">{selectedAsset}</div>
          </div>
          <div className="setPrice__subcontainer_head">
            <div className="setPrice__subcontainer-item">
              Current Asset Price
            </div>
            <div className="setPrice__subcontainer-item">
              {bitcoinPrice.toFixed(2)}
            </div>
            <div className="setPrice__subcontainer-item"> USD </div>
          </div>
        </div>
        <div className="mainContent_body-title">
          Setup 4 price tiers that will trigger NFT to change their mood
        </div>
        <div className="mainContent__header-explain">
          From highest price at which NFT changes to very happy mood, to lowest
          price at which NFT changes to very sad mood
        </div>
        <div className="mainContent_setPrice-container">
          <div className="setPrice__subcontainer">
            <span className="setPrice__subcontainer-item">
              Highest Price : Very Happy
            </span>
            <span className="setPrice__subcontainer-item-sm">+</span>
            <input
              className="setPrice__subcontainer-item"
              type="text"
              placeholder="Enter price here"
              value={priceHH}
              onChange={handleChangePriceHH}
              style={{ color: "black" }}
            ></input>
            <span className="setPrice__subcontainer-item-sm">%</span>
            <div className="setPrice__subcontainer-sub">
              <span className="setPrice__subcontainer-item-sm">=</span>
              <span className="setPrice__subcontainer-item-center">
                {(bitcoinPrice * (1 + priceHH / 100)).toFixed(2)}
              </span>
              <span className="setPrice__subcontainer-item-sm">USD</span>
            </div>
          </div>
          <div className="setPrice__subcontainer">
            <span className="setPrice__subcontainer-item">
              Higher Price : Happy
            </span>
            <span className="setPrice__subcontainer-item-sm">+</span>
            <input
              className="setPrice__subcontainer-item"
              type="text"
              placeholder="Enter price here"
              value={priceH}
              onChange={handleChangePriceH}
              style={{ color: "black" }}
            ></input>
            <span className="setPrice__subcontainer-item-sm">%</span>
            <div className="setPrice__subcontainer-sub">
              <span className="setPrice__subcontainer-item-sm">=</span>
              <span className="setPrice__subcontainer-item-center">
                {(bitcoinPrice * (1 + priceH / 100)).toFixed(2)}
              </span>
              <span className="setPrice__subcontainer-item-sm">USD</span>
            </div>
          </div>

          <div className="setPrice__subcontainer">
            <span className="setPrice__subcontainer-item">
              Current Price : Normal
            </span>
            <span className="setPrice__subcontainer-item-sm">+</span>
            <span className="setPrice__subcontainer-item">0</span>
            <span className="setPrice__subcontainer-item-sm">%</span>
            <div className="setPrice__subcontainer-sub">
              <span className="setPrice__subcontainer-item-sm">=</span>
              <span className="setPrice__subcontainer-item-center">
                {bitcoinPrice.toFixed(2)}
              </span>
              <span className="setPrice__subcontainer-item-sm">USD</span>
            </div>
          </div>

          <div className="setPrice__subcontainer">
            <span className="setPrice__subcontainer-item">
              Lower Price : Sad
            </span>
            <span className="setPrice__subcontainer-item-sm">+</span>
            <input
              className="setPrice__subcontainer-item"
              type="text"
              placeholder="Enter price here"
              value={priceL}
              onChange={handleChangePriceL}
              style={{ color: "black" }}
            ></input>
            <span className="setPrice__subcontainer-item-sm">%</span>
            <div className="setPrice__subcontainer-sub">
              <span className="setPrice__subcontainer-item-sm">=</span>
              <span className="setPrice__subcontainer-item-center">
                {((bitcoinPrice * (100 - priceL)) / 100).toFixed(2)}
              </span>
              <span className="setPrice__subcontainer-item-sm">USD</span>
            </div>
          </div>

          <div className="setPrice__subcontainer">
            <span className="setPrice__subcontainer-item">
              Lowest Price : Very Sad
            </span>
            <span className="setPrice__subcontainer-item-sm">-</span>
            <input
              className="setPrice__subcontainer-item"
              type="text"
              placeholder="Enter price here"
              value={priceLL}
              onChange={handleChangePriceLL}
              style={{ color: "black" }}
            ></input>
            <span className="setPrice__subcontainer-item-sm">%</span>
            <div className="setPrice__subcontainer-sub">
              <span className="setPrice__subcontainer-item-sm">=</span>
              <span className="setPrice__subcontainer-item-center">
                {((bitcoinPrice * (100 - priceLL)) / 100).toFixed(2)}
              </span>
              <span className="setPrice__subcontainer-item-sm">USD</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mainContent__footer">
        <Button
          onClick={handleSubmitForm}
          color="inherit"
          className="button"
          sx={{
            color: "#400e32",
            backgroundColor: "#F2cd5C",
            width: "200px",
            height: "48px",
          }}
        >
          {" "}
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default SetPrice;
