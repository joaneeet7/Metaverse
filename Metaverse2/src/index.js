import * as THREE from "../three.module.js";
import Movements from "./movements.js";
import blockchain from "./Web3.js";
import abi from "./abi/abi.json" assert {type: "json"};
import {OrbitControls, MapControls} from "../../Example/controls/OrbitControls.js"

// Declaration of a new scene with Three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

// Camera and renderer configuration
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Mouse control
const controls = new OrbitControls( camera, renderer.domElement );

// Setting the scene lights
const ambient_light = new THREE.AmbientLight(0xBDA355);
const directional_light = new THREE.DirectionalLight(0xffffff, 1);
ambient_light.add(directional_light);
scene.add(ambient_light)

// Setting up a flat space of the Metaverse
const geometry = new THREE.BoxGeometry(100, 0.2, 50);
const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const layer = new THREE.Mesh(geometry, material);
scene.add(layer);

// Geometric figure to be represented in the Metaverse: Cone
const geometry_cone = new THREE.ConeGeometry(5, 10, 32);
const material_cone = new THREE.MeshBasicMaterial({ color: 0xED810A });
const cone = new THREE.Mesh(geometry_cone, material_cone);
cone.position.set(-10, 5, 0)
scene.add(cone);

// Geometric figure to be represented in the Metaverse: Cylinder
const geometry_cylinder = new THREE.CylinderGeometry(5, 5, 5, 32);
const material_cylinder = new THREE.MeshBasicMaterial({ color: 0x0AC3ED });
const cylinder = new THREE.Mesh(geometry_cylinder, material_cylinder);
cylinder.position.set(20, 5, 0)
scene.add(cylinder);

// Camera positioning
camera.position.set(10, 15, 40);

// User camera rotations
function animate() {
    requestAnimationFrame(animate);
    controls.update()
    // Movement to the left
    if (Movements.isPressed(37)) {
        camera.position.x -= 0.5;
    }
    // Upward movement
    if (Movements.isPressed(38)) {
        camera.position.x += 0.5;
        camera.position.y += 0.5;
    }
    // Movement to the right
    if (Movements.isPressed(39)) {
        camera.position.x += 0.5;
    }
    // Downward movement
    if (Movements.isPressed(40)) {
        camera.position.x -= 0.5;
        camera.position.y -= 0.5;
    }
    camera.lookAt(layer.position);
    renderer.render(scene, camera);
}
animate();

// New NFT
const buttonMint = document.getElementById('mint');
buttonMint.addEventListener('click', mintNFT);
function mintNFT() {
    // Parameters to create a NFT in the Metaverse
    var nft_name = document.getElementById("nft_name").value;
    var nft_width = document.getElementById("nft_width").value;
    var nft_height = document.getElementById("nft_height").value;
    var nft_depth = document.getElementById("nft_depth").value;
    var nft_x = document.getElementById("nft_x").value;
    var nft_y = document.getElementById("nft_y").value;
    var nft_z = document.getElementById("nft_z").value;

    // If Metamask is not available, notify the user
    if (typeof window.ethereum == "undefined") {
        console.log("You should install Metamask to use it!");
    }
    // Web3 Instance
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0x2DB65c252B9bccD9eC28Ac949A037999Ac28BE16");

    web3.eth.getAccounts().then((accounts) => {
        contract.methods.mint(nft_name,nft_width,nft_height,nft_depth,nft_x,nft_y,nft_z).send({ from: accounts[0] }).then((data) => {
            console.log("NFT available in the Metaverse!")
        })
    })
}

// Web3 connection to the data generated in the Blockchain to be 
// represented in the Metaverse
blockchain.then((result) => {
    // For each construction paid for in the Smart Contract, 
    // a graphical representation is made in the Metaverse
    result.building.forEach((building, index) => {
        if (index <= result.supply) {
            // Representation of NFT tokens as boxes 
            const boxGeometry = new THREE.BoxGeometry(building.w, building.h, building.d);
            const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x33FFFC });
            const box = new THREE.Mesh(boxGeometry, boxMaterial);
            box.position.set(building.x, building.y, building.z);
            scene.add(box);
        }
    });
});
