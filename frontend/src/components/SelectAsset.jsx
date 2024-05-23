import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import bitcoinlogo from "../assets/bitcoin.svg";
import ethereumlogo from "../assets/ethereum.svg";
import chainlinklogo from "../assets/chainlink.svg";

function SelectAsset({ pageCount, setPageCount }) {
  const { selectedAsset, setSelectedAsset } = useContext(AppContext);
  //Supported Asset List
  const assetList = [
    { name: "bitcoin", symbol: "BTC", logo: bitcoinlogo },
    { name: "ethereum", symbol: "ETH", logo: ethereumlogo },
    { name: "chainlink", symbol: "LINK", logo: chainlinklogo },
  ];
  const handleSelectAsset = (event) => {
    // ดึงค่า asset ที่เค้าเลือก
    console.log(event);
    console.log(event.target.value);
    setSelectedAsset(event.target.value);
    setPageCount(pageCount + 1);
  };
  function Asset({ assetList }) {
    return assetList.map((asset, index) => (
      <button
        key={index}
        className="mainContent__body-asset"
        type="submit"
        value={asset.name}
        onClick={handleSelectAsset}
      >
        <img className="assetLogo" src={asset.logo}></img>
        <p>{`${asset.name} (${asset.symbol})`} </p>
      </button>
    ));
  }
  return (
    <div>
      <div className="mainContent__header">
        <div className="mainContent__header-stepname">Step 3: Select Asset</div>
        <div className="mainContent__header-explain">
          Choose your favorite asset to track to price. <br /> You can select
          only 1 asset at at time.
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
