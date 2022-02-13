// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Openzeppelin Imports
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

// Creation of the Metaverse Smart Contract with NFT Tokens
contract Metaverse is ERC721 {

    // Counters to regulate the current amount of NFT tokens minted
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    // Total number of NFT tokens available for creation
    uint256 public maxSupply = 7;

    // Cost to be paid for each NFT token
    uint256 public cost = 0 ether;

    // Constructor that receives name and symbol from the NFT token and 
    // establishes the structures of the Metaverse
    constructor() ERC721("META", "MJG") {
        buildings.push(Building("Restaurant", 0, 0, 0, 0, 0, 0));
        buildings.push(Building("House", 1, 3, 2, 2, 0, 3));
        buildings.push(Building("Joan's House", 4, 7, 3, 15, 0, 6));
        buildings.push(Building("George's House", 2, 5, 4, 10, 0, 6));
        buildings.push(Building("Gallery", 1, 6, 2, 10, 0, 6));
        buildings.push(Building("Bakery", 2, 1, 12, 2, 0, 6));
        buildings.push(Building("Cinema", 5, 1, 2, 4, 7, 2));
    }

    // Metaverse building positioning data structure
    struct Building {
        string name;
        int8 w;
        int8 h;
        int8 d;
        int8 x;
        int8 y;
        int8 z;
    }

    // List of Metaverse constructions
    Building[] public buildings;

    // Obtaining the buildings made in the Metaverse
    function getBuildings() public view returns (Building[] memory) {
        return buildings;
    }

    // Current supply of NFT tokens
    function totalSupply() public view returns (uint256) {
        return supply.current();
    }

    // Restrictions on the creation of new NFTs
    modifier mintRestrictions(uint256 _mintAmount) {
        require(_mintAmount > 0, "Invalid mint amount!");
        require(supply.current() + _mintAmount <= maxSupply, "Max supply exceeded!");
        _;
    }

    // Creation of a new NFT token for the Metaverse
    function mint(uint256 _mintAmount) public payable mintRestrictions(_mintAmount) {
        require(msg.value >= cost * _mintAmount, "Insufficient funds!");
        for (uint256 i = 0; i < _mintAmount; i++) {
            supply.increment();
            _safeMint(msg.sender, supply.current());
        }
    }
}
