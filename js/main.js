import * as THREE from 'three';
import { GUI } from './lil-gui.module.min.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
});

const starVertices = []
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 2000;
    starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 15;

var mouse = new THREE.Vector2;
addEventListener('mousemove', () => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / innerHeight) * 2 + 1;
})

// setupGUI();

// function setupGUI() {    
//     let h;

//     const gui = new GUI();

//     h = gui.addFolder('Atmosphere Parameters');

//     h.add(atmosphereParams, 'r', 0, 1);
//     h.add(atmosphereParams, 'g', 0, 1);
//     h.add(atmosphereParams, 'b', 0, 1);

//     h.add(atmosphereParams, 'ozoneThickness', 0, 2);
// }

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();