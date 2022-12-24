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

const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), atmosphereMaterial);

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

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    sphere.rotation.y += 0.001;
    gsap.to(group.rotation, {
        x: -mouse.y * 0.3,
        y: mouse.x * 0.5,
        duration: 2
    })
}
animate();