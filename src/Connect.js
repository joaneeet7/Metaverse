import abi from "./abi/abi.json" assert {type: "json"};

const connect = new Promise((res, rej) => {
    if (typeof window.ethereum == "undefined") {
        rej("Install Metamask");
    }
    window.ethereum.request({ method: "eth_requestAccounts" });
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0x6209858b82f5575C93596FbC231A8e06dC84Bec6");
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.totalSupply().call({ from: accounts[0] }).then((supply) => {
            contract.methods.getBuildings().call({ from: accounts[0] }).then((data) => {
                res({supply: supply, building: data});
            })
        })
    })
});

export default connect;