import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useState } from "react";
export default function GetWalletData({ pageCount, setPageCount }) {
  // ถ้า ค่าของ isConnected เปลี่ยน >> set เป้น state >> ถ้าค่าเปลี่ยนให้เพิ่ม count ด้วย
  const [walletDetails, setWalletDetails] = useState(null);
  const [walletError, setWalletError] = useState(false);
  // อัพเดทค่าเมื่อ connect wallet แล้ว
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  // setWalletDetails({ address, chainId, isConnected });
  console.log(
    "user wallet address:",
    address,
    " chainID: ",
    chainId,
    "isConnected: ",
    isConnected
  );
  const handleClick = () => {
    if (!isConnected) {
      setWalletError(true);
      return;
    } else setPageCount(pageCount + 1);
  };
  return (
    <div>
      <div className="mainContent__header">
        <div className="mainContent__header-stepname">
          Step 1: Connect Wallet
        </div>
        <div className="mainContent__header-explain">
          Connect Your Wallet with Wallet Connect. You will receive the dynamic
          NFT in this wallet
        </div>
      </div>
      <div className="mainContent__body">
        <div className="mainContent__body-connectwallet">
          <w3m-button />
        </div>

        {walletError ? <div>Connect wallet first!</div> : null}
      </div>
      <div className="mainContent__footer">
        <button className="confirmBtn" onClick={handleClick}>
          Next
        </button>
      </div>
    </div>
  );
}
