// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Openzeppelin Imports
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

// Creation of the Metaverse Smart Contract with NFT Tokens
contract Metaverse is ERC721, Ownable {

    // Counters to regulate the current amount of NFT tokens minted
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    // Total number of NFT tokens available for creation
    uint256 public maxSupply = 100;

    // Cost to be paid for each NFT token
    uint256 public cost = 0 ether;

    // Owner and its properties in the Metaverse
    mapping (address => Building[]) NFTOWners;

    // Constructor that receives name and symbol from the NFT token 
    constructor() ERC721("META", "MJG") {}

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

    // Creation of the Construction as an NFT token in the Metaverse 
    // by providing its coordinates
    function mint(string memory _building_name, int8 _w, int8 _h, int8 _d, int8 _x, int8 _y, int8 _z) public payable {
        require(supply.current() <= maxSupply, "Max supply exceeded!");
        require(msg.value >= cost , "Insufficient funds!");
        supply.increment();
        _safeMint(msg.sender, supply.current());
        Building memory _newBuild = Building(_building_name, _w, _h, _d, _x, _y, _z);
        buildings.push(_newBuild);
        NFTOWners[msg.sender].push(_newBuild);
    }

    // Obtain a user's Metaverse buildings
    function getOwnerBuildings() public view returns (Building [] memory){
        return NFTOWners[msg.sender];
    }

    // Extraction of ethers from the Smart Contract to the Owner
    function withdraw() external payable onlyOwner{
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }
}
