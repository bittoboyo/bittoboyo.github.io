const atmosphereParams = {
    ozoneThickness: 0.7,
    r: 0.3,
    g: 0.6,
    b: 1.0,
}

import * as THREE from 'three';
import { GUI } from './lil-gui.module.min.js';
import {vertexShader} from '../shaders/vertex.glsl.js';
import {fragmentShader} from '../shaders/fragment.glsl.js';
import {atmosphereVertexShader} from '../shaders/atmosphereVertex.glsl.js';
import {atmosphereFragmentShader} from '../shaders/atmosphereFragment.glsl.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

const startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', () => {
    const overlay = document.getElementById( 'overlay' );
    overlay.remove();
    sound.play();
});

const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.Audio(listener);
const loader = new THREE.AudioLoader();
loader.load('./songs/nms.mp3', (buffer) => {
    sound.setBuffer(buffer);
    sound.setVolume(0.02);
});

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


//Create Planet
const sphereMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        globeTexture: {
            value: new THREE.TextureLoader().load('./images/globe.jpg')
        },
        r: {
            value: 0
        },
        g: {
            value: 0
        },
        b: {
            value: 0
        }
    }
});

const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), sphereMaterial);

//Create Extra Atmosphere
const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    uniforms: {
        ozoneThickness: {
            value: 0
        }
    },
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
});

const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), atmosphereMaterial);

atmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(atmosphere);

const group = new THREE.Group();
group.add(sphere);
scene.add(group);

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

setupGUI();

function setupGUI() {    
    let h;

    const gui = new GUI();

    h = gui.addFolder('Atmosphere Parameters');

    h.add(atmosphereParams, 'r', 0, 1);
    h.add(atmosphereParams, 'g', 0, 1);
    h.add(atmosphereParams, 'b', 0, 1);

    h.add(atmosphereParams, 'ozoneThickness', 0, 2);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    atmosphereMaterial.uniforms.ozoneThickness.value = atmosphereParams.ozoneThickness
    sphereMaterial.uniforms.r.value = atmosphereParams.r;
    sphereMaterial.uniforms.g.value = atmosphereParams.g;
    sphereMaterial.uniforms.b.value = atmosphereParams.b;

    sphere.rotation.y += 0.001;
    gsap.to(group.rotation, {
        x: -mouse.y * 0.3,
        y: mouse.x * 0.5,
        duration: 2
    })
}
animate();