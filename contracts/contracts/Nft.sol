// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

contract PriceTureNFT is ERC721, ERC721Enumerable, ERC721URIStorage, KeeperCompatibleInterface, Ownable {
    AggregatorV3Interface public priceFeed;
    mapping(uint256 => uint256) private _tokenPriceTiers;
    uint256[] _priceTiersThresholds;
    uint256 private _nextTokenId;

    uint public /* immutable */ interval; 
    uint public lastTimeStamp;
    int256 public currentPrice;
    
    // TODO turn this into function that receive argument as a JSON files and return the string
    // Metadata JSON for URI each stage of the NFT.
    // string[] _tokenURIs = [
    //     "https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/0.json?alt=media&token=c30a17d6-31b2-4a16-8370-aa3bdcb03ff4",
    //     "https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/1.json?alt=media&token=dda15231-09f2-43da-91c1-3a2b697eb423",
    //     "https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/2.json?alt=media&token=bac78e83-505c-421c-af5a-bb0c91d24fbe",
    //     "https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/3.json?alt=media&token=6f459e5e-8c2d-4775-be19-18115288298b",
    //     "https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/4.json?alt=media&token=2e2b7980-7325-491a-b3b7-9d89cf48e2cb"
    // ];

    // Helper function to get the latest price from Chainlink
     function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        (
            ,
            int price,
            ,
            ,
        ) = priceFeed.latestRoundData();
        return price;
    }

    function setPriceTiersThresholds(uint256[] memory priceTiers) public returns (uint256[] memory) {
        _priceTiersThresholds = priceTiers;
        return _priceTiersThresholds;
    }

    constructor(uint updateInterval, address _pricefeed) ERC721("Priceture", "PRCTURE") {
         // Set the keeper update interval
        interval = updateInterval; 
        lastTimeStamp = block.timestamp;  //  seconds since unix epoch
        priceFeed = AggregatorV3Interface(_pricefeed);
        currentPrice = getChainlinkDataFeedLatestAnswer();

    }

    // function to mint to the wallet owner
    function safeMint(
        address to,
        string memory jsonUrl,
        uint256[] memory priceTiers
    ) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;

        string[] memory _tokenURI = jsonUrl.file;
        setPriceTiersThresholds(priceTiers);
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURIs[2]);
        return tokenId;
    }

       // Function to update the token URI based on the current price tier
    function updateTokenURI(uint256 tokenId) public {
        int256 latestPrice = getChainlinkDataFeedLatestAnswer();
        uint256 currentTier = determinePriceTier(latestPrice);
        _tokenPriceTiers[tokenId] = currentTier;
        _setTokenURI(tokenId, _tokenURIs[currentTier]);

    }

     // Helper function to determine the price tier based on the latest price
     function determinePriceTier(int256 latestPrice) public view returns (uint256) {
        for (uint256 i = _priceTiersThresholds.length; i>0; i--) {
            if (uint256(latestPrice) >= _priceTiersThresholds[i]) {
                return i;
            }
        }
        // If price doesn't fall into any tier, return the first tier
        return 0;
    }

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /*performData */) {
         upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
    }

    function performUpkeep(bytes calldata /* performData */ ) external override {
        //We highly recommend revalidating the upkeep in the performUpkeep function
        if ((block.timestamp - lastTimeStamp) > interval ) {
            lastTimeStamp = block.timestamp;         
            int latestPrice =  getChainlinkDataFeedLatestAnswer(); 
            updateTokenURI(_nextTokenId);


    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

