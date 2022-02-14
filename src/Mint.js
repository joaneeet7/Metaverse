import abi from "./abi/abi.json" assert {type: "json"};

const mint = new Promise((res, rej) => {

    // If Metamask is not available, notify the user
    if (typeof window.ethereum == "undefined") {
        rej("You should install Metamask to use it!");
    }

    // Web3 Instance
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0x2927e5823e822aB27a17ef1C6B248c99A007ABa7");

    web3.eth.getAccounts().then((accounts) => {
        contract.methods.mint("Joan",2,3,4,10,11,13).send({ from: accounts[0] }).then((data) => {
            console.log("Yes!")
            res({ building: data });
        })
    })
});

export default mint;