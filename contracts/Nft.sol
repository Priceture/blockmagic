// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts@4.6.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.6.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.6.0/access/Ownable.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

contract PriceTureNFT is ERC721, ERC721URIStorage, KeeperCompatible, Ownable {
    // Counter for the token ID
    uint256 private _tokenIdCounter;

    // Mapping tokenId => currentPriceTier => Metadata
    mapping(uint256 => mapping(uint256 => string)) public _metadata;

    // Mapping tokenId => currentPriceTier => priceThreshold
    mapping(uint256 => mapping(uint256 => uint256))
        public _priceTiersThresholds;

    // mapping tokenId => priceFeedAddress
    mapping(uint256 => AggregatorV3Interface) public priceFeeds;

    // Interval for the keeper to update the token URI
    uint public interval;
    uint public lastTimeStamp;

    event Minted(address indexed to, uint256 indexed tokenId);

    // Constructor to set the update interval and the price feed
    constructor() ERC721("Priceture", "PRCTURE") {
        // Set the keeper update interval every 24 hours
        interval = 86400;
        lastTimeStamp = block.timestamp; //  seconds since unix epoch
    }

    // function to mint to the wallet owner
    function safeMint(
        address to,
        uint256[] memory priceTiers, // it has to be array of the exact price in 8 decimal format for each tier eg. [6700012345678,7000012345678,7500012345678,8000012345678,8500012345678]
        string[] memory metadataJson, // put 5 IPFS URLs
        address priceFeedAddress
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter;

        // set _metadata for this tokenId
        for (uint i = 0; i < 5; i++) {
            _metadata[tokenId][i] = metadataJson[i];
        }

        // set _priceTiersThresholds for this tokenId
        for (uint i = 0; i < 5; i++) {
            _priceTiersThresholds[tokenId][i] = priceTiers[i];
        }

        // set _priceFeedAddress for this tokenId
        priceFeeds[tokenId] = AggregatorV3Interface(priceFeedAddress);

        // mint the token and set the token URI
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _metadata[tokenId][2]);

        // emit event
        emit Minted(to, tokenId);

        // increment the tokenIdCounter for the next minting token
        _tokenIdCounter += 1;

        return tokenId;
    }

    // Function to update all tokens URI based on the current price tier
    function updateTokenURI() public {
        lastTimeStamp = block.timestamp;
        for (uint i = 0; i < _tokenIdCounter; i++) {
            int256 latestPrice = getChainlinkDataFeedLatestAnswer(i);
            uint256 currentTier = determinePriceTier(latestPrice, i);
            _setTokenURI(i, _metadata[i][currentTier]);
        }
    }

    // Helper function to determine the current price tier based on the latest price and return the position in the array
    function determinePriceTier(
        int256 latestPrice,
        uint256 tokenId
    ) public view returns (uint256) {
        for (uint256 i = 0; i < 5; i++) {
            if (uint256(latestPrice) <= _priceTiersThresholds[tokenId][i]) {
                return i;
            }
        }
        // If price doesn't fall into any tier, return the last tier
        return 4;
    }

    // check upkeep function to call performUpkeep
    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /*performData */)
    {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
    }

    // function to execute when upKeepNeeded = true
    function performUpkeep(bytes calldata /* performData */) external override {
        //We highly recommend revalidating the upkeep in the performUpkeep function
        if ((block.timestamp - lastTimeStamp) > interval) {
            lastTimeStamp = block.timestamp;
            updateTokenURI();
        }
    }

    // Set the interval for the keeper to update the token URI
    function setInterval(uint256 newInterval) public onlyOwner {
        interval = newInterval;
    }

    // Helper function to get the latest price from Chainlink
    function getChainlinkDataFeedLatestAnswer(
        uint256 tokenId
    ) public view returns (int) {
        (, int price, , , ) = priceFeeds[tokenId].latestRoundData();
        return price;
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
