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

//OLD STARS
// const starGeometry = new THREE.BufferGeometry();
// const starMaterial = new THREE.PointsMaterial({
//     color: 0xffffff
// });

// const starVertices = []
// for (let i = 0; i < 10000; i++) {
//     const x = (Math.random() - 0.5) * 2000;
//     const y = (Math.random() - 0.5) * 2000;
//     const z = -Math.random() * 2000;
//     starVertices.push(x, y, z);
// }

// starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

// const stars = new THREE.Points(starGeometry, starMaterial);
// scene.add(stars);

//NEW STARS (LIGHTSPEED EFFECT)
let line_count = 1000;
let geom = new THREE.BufferGeometry();
geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6*line_count), 3));
geom.setAttribute("velocity", new THREE.BufferAttribute(new Float32Array(2*line_count), 1));
let pos = geom.getAttribute("position");
let pa = pos.array;
let vel = geom.getAttribute("velocity");
let va = vel.array;

for (let line_index = 0; line_index < line_count; line_index++) {
  var x = Math.random() * 400 - 200;
  var y = Math.random() * 200 - 100;
  var z = Math.random() * 500 - 100;
  var xx = x;
  var yy = y;
  var zz = z;
  //Begin the line
  pa[6*line_index] = x;
  pa[6*line_index+1] = y;
  pa[6*line_index+2] = z;
  //End the line
  pa[6*line_index+3] = xx;
  pa[6*line_index+4] = yy;
  pa[6*line_index+5] = zz;

  va[2*line_index] = va[2*line_index+1] = 0;
}

//DEBUGGER FOR LIGHTSPEED
let mat = new THREE.LineBasicMaterial({color: 0xffffff});
let lines = new THREE.LineSegments(geom, mat);
scene.add(lines);

camera.position.z = 200;

function animate() {
    for (let line_index = 0; line_index < line_count; line_index++) {
        va[2*line_index] += 0.03; //Increase the velocity by the acceleration
        va[2*line_index+1] += 0.025;

        // pa[6*line_index]++ //x Start
        // pa[6*line_index+1]++ //y
        pa[6*line_index+2] += va[6*line_index]; //z

        // pa[6*line_index+3]++; //x End
        // pa[6*line_index+4]++; //y
        pa[6*line_index+5] += va[2*line_index+1]; //z

        if (pa[6*line_index+5] > 200) {
          var z = Math.random() * 200 - 100;
          pa[6*line_index+2] = z;
          pa[6*line_index+5] = z;
          va[2*line_index] = 0;
          va[2*line_index+1] = 0;
        }
      }
      pos.needsUpdate = true;
      renderer.clearColor();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);

    // renderer.render(scene, camera);
    // requestAnimationFrame(animate);
}
animate();