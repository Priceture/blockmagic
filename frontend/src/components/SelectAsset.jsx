import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import bitcoinlogo from "../assets/bitcoin.svg";
import ethereumlogo from "../assets/ethereum.svg";

function SelectAsset({ pageCount, setPageCount }) {
  const { selectedAsset, setSelectedAsset } = useContext(AppContext);
  //Supported Asset List
  const assetList = [
    { name: "bitcoin", symbol: "BTC", logo: bitcoinlogo },
    { name: "ethereum", symbol: "ETH", logo: ethereumlogo },
  ];
  const handleSelectAsset = (event) => {
    // ดึงค่า asset ที่เค้าเลือก
    console.log(event.target.value);
    setSelectedAsset(event.target.value);
    setPageCount(pageCount + 1);
  };
  function Asset({ assetList }) {
    return assetList.map((asset, index) => (
      <button
        key={index}
        className="confirmBtn"
        type="submit"
        value={asset.name}
        onClick={handleSelectAsset}
      >
        <p>{asset.symbol}</p>
        <img className="assetLogo" src={asset.logo}></img>
      </button>
    ));
  }
  return (
    <div>
      <h1>Select Asset</h1>
      <form>
        <Asset assetList={assetList} />
      </form>
    </div>
  );
}

export default SelectAsset;
