import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import bitcoinlogo from "../assets/bitcoin.svg";
import ethereumlogo from "../assets/ethereum.svg";
import chainlinklogo from "../assets/chainlink.svg";

function SelectAsset({ pageCount, setPageCount }) {
  const { selectedAsset, setSelectedAsset } = useContext(AppContext);
  const assetList = [
    { name: "bitcoin", symbol: "BTC", logo: bitcoinlogo },
    { name: "ethereum", symbol: "ETH", logo: ethereumlogo },
    { name: "chainlink", symbol: "LINK", logo: chainlinklogo },
  ];
  const handleSelectAsset = (event) => {
    console.log(event.target.id);
    setSelectedAsset(event.target.id);
    setPageCount(pageCount + 1);
  };
  function Asset({ assetList }) {
    return assetList.map((asset, index) => (
      <button
        key={index}
        className="mainContent__body-asset"
        type="submit"
        value={asset.name}
        id={asset.name}
        onClick={handleSelectAsset}
      >
        <img id={asset.name} className="assetLogo" src={asset.logo}></img>
        <p id={asset.name}>{`${asset.name} (${asset.symbol})`} </p>
      </button>
    ));
  }
  return (
    <div>
      <div className="mainContent__header">
        <div className="mainContent__header-stepname">Step 3: Select Asset</div>
        <div className="mainContent__header-explain">
          Choose your favorite asset to track the price.
        </div>
      </div>
      <div className="mainContent__body">
        <Asset className="mainContent__body-assetList" assetList={assetList} />
      </div>
      <div className="mainContent__footer"></div>
    </div>
  );
}

export default SelectAsset;
