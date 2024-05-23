// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

contract PriceTureNFT is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    KeeperCompatibleInterface,
    Ownable
{
    // setup priceFeed from Chainlink
    AggregatorV3Interface public priceFeed;
    int256 public currentPrice;

    // Counter for the token ID
    uint256 private _tokenIdCounter;

    // Mapping tokenId => currentPriceTier => Metadata
    mapping(uint256 => mapping(uint256 => string)) private _metadata;

    // Mapping tokenId => currentPriceTier => priceThreshold
    mapping(uint256 => mapping(uint256 => uint256)) private _priceTiersThresholds;

    // Interval for the keeper to update the token URI
    uint public interval;
    uint public lastTimeStamp;

    // Helper function to get the latest price from Chainlink
    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return price;
    }

    // Constructor to set the update interval and the price feed
    constructor(
        uint updateInterval,
        address _priceFeed
    ) ERC721("Priceture", "PRCTURE") {
        // Set the keeper update interval
        interval = updateInterval;
        lastTimeStamp = block.timestamp; //  seconds since unix epoch

        // Set the price feed for BTC/USD on Sepolia at 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
        priceFeed = AggregatorV3Interface(_priceFeed);
        currentPrice = getChainlinkDataFeedLatestAnswer();
    }

    // function to mint to the wallet owner
    function safeMint(
        address to,
        uint256[] memory priceTiers, // it has to be array of the exact price in 8 decimal format for each tier eg. [6700012345678, 7000012345678, 7500012345678, 8000012345678, 8500012345678]
        string[] memory metadataJson // it has to be stringified json format eg. ["{\"name\": \"NFT1\"}", "{\"name\": \"NFT2\"}", "{\"name\": \"NFT3\"}", "{\"name\": \"NFT4\"}", "{\"name\": \"NFT5\"}"]
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

        // mint the token and set the token URI
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _metadata[tokenId][2]);

        // increment the tokenIdCounter for the next minting token
        _tokenIdCounter += 1;

        return tokenId;
    }

    // Function to update all tokens URI based on the current price tier
    function updateTokenURI() public {
        int256 latestPrice = getChainlinkDataFeedLatestAnswer();

        for (uint i = 0; i < _tokenIdCounter; i++) {
            uint256 currentTier = determinePriceTier(latestPrice, i);
            _setTokenURI(i, _metadata[i][currentTier]);
        }
        // update the current price
        currentPrice = latestPrice;
    }

    // Helper function to determine the current price tier based on the latest price and return the position in the array
    function determinePriceTier(
        int256 latestPrice,
        uint256 tokenId
    ) public view returns (uint256) {
        for (uint256 i = 4; i >= 0; i--) {
            if (uint256(latestPrice) >= _priceTiersThresholds[tokenId][i]) {
                return i;
            }
        }
        // If price doesn't fall into any tier, return the first tier
        return 0;
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

    // Function to set PriceFeed address, this should be updated by the user that link to their tokenID but skip for now
    function setPriceFeed(address newFeed) public onlyOwner {
        priceFeed = AggregatorV3Interface(newFeed);
    }

    // Set the interval for the keeper to update the token URI
    function setInterval(uint256 newInterval) public onlyOwner {
        interval = newInterval;
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
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

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
