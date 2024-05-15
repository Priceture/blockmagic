import React from "react";

function SelectAsset({ pageCount, setPageCount }) {
  //structure asset list : name, symbol, logo svg file
  const assetList = [""];
  const handleClick = () => {
    setPageCount(pageCount + 1);
  };
  return (
    <div>
      <h1>Select Asset</h1>
      <form>
        <button className="confirmBtn" type="submit" onClick={handleClick}>
          Next
        </button>
      </form>
    </div>
  );
}

export default SelectAsset;
