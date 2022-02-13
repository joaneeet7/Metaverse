import Movements from "./movements.js";
import blockchain from "./Web3.js";

// Declaration of a new scene with Three.js
const scene = new THREE.Scene();

// Camera and renderer configuration
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Setting the scene lights
const ambient_light = new THREE.AmbientLight(0xBDA355);
const directional_light = new THREE.DirectionalLight(0x337DFF, 0.5);

ambient_light.add(directional_light);
scene.add(ambient_light)

// Geometric figure to be represented in the Metaverse: Box
const geometry = new THREE.BoxGeometry(50, 0.1, 50);
const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Geometric figure to be represented in the Metaverse: Cone
const geometry_cone = new THREE.ConeGeometry( 5, 10, 32 );
const material_cone = new THREE.MeshBasicMaterial( {color: 0xED810A} );
const cone = new THREE.Mesh( geometry_cone, material_cone );
cone.position.set(-10, 5, 0)
scene.add(cone);

// Geometric figure to be represented in the Metaverse: Cylinder
const geometry_cylinder = new THREE.CylinderGeometry( 5, 5, 5, 32 );
const material_cylinder = new THREE.MeshBasicMaterial( {color: 0x0AC3ED} );
const cylinder = new THREE.Mesh( geometry_cylinder, material_cylinder );
cylinder.position.set(20, 5, 0)
scene.add(cylinder);

// Camera positioning
camera.position.set(10, 15, 40);

// User camera rotations
function animate() {
    requestAnimationFrame(animate);
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
    camera.lookAt(box.position);
    renderer.render(scene, camera);
}
animate();


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
