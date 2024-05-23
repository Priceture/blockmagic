import React, { useContext, useEffect, useState } from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { ethers, BrowserProvider, Contract, formatUnits } from "ethers";
import { AppContext } from "../context/AppContext";
import { Button } from "@mui/material";

function MintNFT({ pageCount, setPageCount }) {
  const { metadataInContext, setMetadataInContext } = useContext(AppContext);
  const {
    priceArr,
    setPriceArr,
    tokenId,
    setTokenId,
    selectedAsset,
    setSelectedAsset,
  } = useContext(AppContext);
  const { ipfsUrls, setIpfsUrls } = useContext(AppContext);

  const [walletDetails, setWalletDetails] = useState(null);
  const [walletError, setWalletError] = useState(false);
  // อัพเดทค่าเมื่อ connect wallet แล้ว
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  // to be updated ABI
  const Abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "updateInterval",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "_metadata",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "_priceTiersThresholds",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "int256",
          name: "latestPrice",
          type: "int256",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "determinePriceTier",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getChainlinkDataFeedLatestAnswer",
      outputs: [
        {
          internalType: "int256",
          name: "",
          type: "int256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "interval",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lastTimeStamp",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "priceFeeds",
      outputs: [
        {
          internalType: "contract AggregatorV3Interface",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256[]",
          name: "priceTiers",
          type: "uint256[]",
        },
        {
          internalType: "string[]",
          name: "metadataJson",
          type: "string[]",
        },
        {
          internalType: "address",
          name: "priceFeedAddress",
          type: "address",
        },
      ],
      name: "safeMint",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "newInterval",
          type: "uint256",
        },
      ],
      name: "setInterval",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "newFeed",
          type: "address",
        },
      ],
      name: "setPriceFeed",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "updateTokenURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // to be updated mint NFT Contract address
  const MintNFTContractAddress = "0xFd51ab165d3253C08eAF085b48Bd5900C69Cf706";

  let priceFeedAddress = "";
  if (selectedAsset === "bitcoin") {
    priceFeedAddress = "0xe7656e23fE8077D438aEfbec2fAbDf2D8e070C4f";
  }
  if (selectedAsset === "ethereum") {
    priceFeedAddress = "0xF0d50568e3A7e8259E16663972b11910F89BD8e7";
  }
  if (selectedAsset === "chainlink") {
    priceFeedAddress = "0xc2e2848e28B9fE430Ab44F55a8437a33802a219C";
  }

  const metadata = {
    file: [
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://cl.imagineapi.dev/assets/133f4b9c-bd1e-484d-8f0e-fa1db84d07a5/133f4b9c-bd1e-484d-8f0e-fa1db84d07a5.png",
        attributes: [{ trait_type: "Feeling", value: "Very Sad" }],
      },
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://cl.imagineapi.dev/assets/15d7ff3e-42b3-468f-b451-850959bb28ed/15d7ff3e-42b3-468f-b451-850959bb28ed.png",
        attributes: [{ trait_type: "Feeling", value: "Sad" }],
      },
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/images%2FIMG_1057.JPG?alt=media",
        attributes: [{ trait_type: "Feeling", value: "Normal" }],
      },
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://cl.imagineapi.dev/assets/3655b102-37ba-4cff-8475-d035b7603ef2/3655b102-37ba-4cff-8475-d035b7603ef2.png",
        attributes: [{ trait_type: "Feeling", value: "Happy" }],
      },
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://cl.imagineapi.dev/assets/7e3cfd26-ed22-48fd-a7e5-bb0adac66107/7e3cfd26-ed22-48fd-a7e5-bb0adac66107.png",
        attributes: [{ trait_type: "Feeling", value: "Very Happy" }],
      },
    ],
  };
  // setMetadataInContext(metadata);
  const handleMintNFT = async () => {
    // call function to mint NFT - SON DO THIS
    // await >> Should return token ID
    // setTokenId() เอาค่า tokenID มา setTokenID
    console.log("this is the address", address);
    console.log("this is price array", priceArr);
    console.log("this is ipfs urls", ipfsUrls);
    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();
    const NFTContract = new Contract(MintNFTContractAddress, Abi, signer);

    // have to update the arguments in safeMint to be address, JSON.stringify(metadata), pricetiers in array
    const mintNFT = await NFTContract.safeMint(
      address,
      priceArr,
      ipfsUrls,
      priceFeedAddress
    );

    // move page to success page
    setPageCount(pageCount + 1);
  };

  return (
    <div>
      <div className="mainContent__header">
        <div className="mainContent__header-stepname">Step 5: Mint NFT</div>
        <div className="mainContent__header-explain">
          Confirm your images and click "Mint NFT" to get your NFT to your
          wallet. <br /> This process costs gas fee.
        </div>
      </div>
      <div className="mainContent__body">
        <div>
          {metadataInContext ? (
            <div>
              <h1 className="mainContent_body-title">Preview your NFT</h1>
              <div className="mainContent__body-imageWrapper">
                {/* {metadataInContext.file.map((item, index) => (
                  <div className="finalImage_container" key={index}>
                    <img src={item.image} className="final_image" alt="NFT" />
                    <p className="finalImage_info">
                      {item.attributes[0].trait_type}:{" "}
                      {item.attributes[0].value}
                    </p>
                  </div>
                ))} */}
              </div>
            </div>
          ) : (
            <div>Metadata is not available</div>
          )}
        </div>
      </div>
      <div className="mainContent__footer">
        <Button
          onClick={handleMintNFT}
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
          Mint NFT
        </Button>
      </div>
    </div>
  );
}

export default MintNFT;
