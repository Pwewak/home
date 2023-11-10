import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry( 6,32,16);
const material = new THREE.MeshBasicMaterial( { color:"silver",wireframe:true } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

camera.position.z = 5;

function onWindowResize() {
			
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );

};



function animate() {
	requestAnimationFrame( animate );


	sphere.rotation.x += 0.001;
	sphere.rotation.y += 0.001;


	renderer.render( scene, camera );
    onWindowResize();
}

animate();
