import abi from "./abi/abi.json" assert {type: "json"};


const blockchain = new Promise((res, rej) => {

    // If Metamask is not available, notify the user
    if (typeof window.ethereum == "undefined") {
        rej("You should install Metamask to use it!");
    }

    // Web3 Instance
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0x2927e5823e822aB27a17ef1C6B248c99A007ABa7");

    // Get my Metamask address
    web3.eth.getAccounts().then((accounts) => {
        console.log("-> My account is:", accounts[0])
    });

    // Get the current supply of NFT tokens
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.totalSupply().call({ from: accounts[0] }).then((supply) => {
            console.log("-> Current supply of NFT tokens: ", supply);
        });
    });

    // Get the Maximum supply of NFT Tokens
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.maxSupply().call({ from: accounts[0] }).then((maxSupply) => {
            console.log("-> Maximum supply of NFT tokens: ", maxSupply);
        });
    });

    // Get your constructions in the Metaverse
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.getOwnerBuildings().call({ from: accounts[0] }).then((buildings) => {
            console.log("-> Your buildings: ", buildings);
        });
    });

    // Get all the constructions made in the Metaverse
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.totalSupply().call({ from: accounts[0] }).then((supply) => {
            contract.methods.getBuildings().call({ from: accounts[0] }).then((data) => {
                res({ supply: supply, building: data });
            })
        })
    })
});

export default blockchain;