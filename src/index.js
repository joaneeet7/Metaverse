import keyInput from "./KeyInput.js";
import connect from "./Connect.js";

const ratio = window.innerWidth / window.innerHeight;

// Escena
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luces
const light = new THREE.AmbientLight(0x404040);
const dLight = new THREE.DirectionalLight(0xffffff, 0.5);
light.add(dLight);
scene.add(light)

// Geometria-1
const geometry = new THREE.BoxGeometry(50, 0.1, 50);
const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const ground = new THREE.Mesh(geometry, material);

scene.add(ground);
camera.position.set(5, 15, 15);

// Animación
function animate() {
    requestAnimationFrame(animate);
    // Rotaciones
    if (keyInput.isPressed(38)) {
        camera.position.x += 0.05;
        camera.position.y += 0.05;
    }
    if (keyInput.isPressed(40)) {
        camera.position.x -= 0.05;
        camera.position.y -= 0.05;
    }
    camera.lookAt(ground.position);
    renderer.render(scene, camera);
}
animate();


// Metamask
connect.then((result) => {
    console.log(result);
    console.log(result.building)
    result.building.forEach((b, index) => {
        if (index <= result.supply) {
            const boxGeometry = new THREE.BoxGeometry(b.w, b.h, b.d);
            const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
            const box = new THREE.Mesh(boxGeometry, boxMaterial);
            box.position.set(b.x, b.y, b.z);
            scene.add(box);
        }
    });
});
