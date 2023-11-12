import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(6, 100, 40);
const material = new THREE.MeshBasicMaterial({
  color: "silver",
  wireframe: true,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const geometry1 = new THREE.SphereGeometry(2, 80, 40);
const material1 = new THREE.MeshBasicMaterial({
  color: "pink",
  wireframe: true,
});
const sphere1 = new THREE.Mesh(geometry1, material1);
scene.add(sphere1);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;
controls.update();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.001;
  sphere.rotation.y += 0.001;
  sphere1.rotation.x -= 0.001;
  sphere1.rotation.y -= 0.001;

  renderer.render(scene, camera);
  onWindowResize();
  controls.update();
}

animate();
