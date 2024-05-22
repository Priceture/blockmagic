import React, { useContext, useEffect, useState } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { ethers, BrowserProvider, Contract, formatUnits} from "ethers";
import { AppContext } from "../context/AppContext";
import { Button } from "@mui/material";


function MintNFT({ pageCount, setPageCount }) {
  const { metadataInContext, setMetadataInContext } = useContext(AppContext);
  const { priceArr, setPriceArr, tokenId, setTokenId } = useContext(AppContext);
  const [walletDetails, setWalletDetails] = useState(null);
  const [walletError, setWalletError] = useState(false);
  // อัพเดทค่าเมื่อ connect wallet แล้ว
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider()

  // to be updated ABI
  const Abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ERC721IncorrectOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ERC721InsufficientApproval",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidOperator",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ERC721NonexistentToken",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeMint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  // to be updated mint NFT Contract address
  const MintNFTContractAddress = '0x250f36675270D24E00d090712Cd8825A447bBD8C'



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
    console.log("this is the address", address)

    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner()
    const NFTContract = new Contract(MintNFTContractAddress, Abi, signer)

    // have to update the arguments in safeMint to be address, JSON.stringify(metadata), pricetiers in array
    const mintNFT = await NFTContract.safeMint(address, 3)

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
              <h1>Preview your NFT</h1>
              <div>
                {metadataInContext.file.map((item, index) => (
                  <div key={index}>
                    <p>
                      {item.attributes[0].trait_type}:{" "}
                      {item.attributes[0].value}
                    </p>
                    <img src={item.image} className="final_image" alt="NFT" />
                  </div>
                ))}
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
