import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
		function refreshPage() {
			location.reload();
		}
		import {PointerLockControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/PointerLockControls.js';
		const gravity = 0.01; // Adjust the gravity value as needed
		const maxJumpHeight = 1.0; // Adjust the maximum jump height as needed
		let velocityY = 0; // Initial vertical velocity
		let isJumping = false;
			const jumpStrength = 0.5;
			let camera, scene, renderer, controls, capsule;
			const objects = [];
			const listener = new THREE.AudioListener();
			const sound = new THREE.Audio( listener );
			let raycaster;
			let moveForward = false;
			let moveBackward = false;
			let moveLeft = false;
			let moveRight = false;
			let canJump = true;
			let cameraMoveSpeed =1;
			let prevTime = performance.now();
			const velocity = new THREE.Vector3();
			const vertex = new THREE.Vector3();
			
			
			const coins = [];
			function checkCollisions() {
			  const playerBoundingBox = new THREE.Box3().setFromObject(capsule);
			
			  for (let i = coins.length - 1; i >= 0; i--) {
				const coin = coins[i];
				const coinBoundingBox = new THREE.Box3().setFromObject(coin);
			
				if (playerBoundingBox.intersectsBox(coinBoundingBox)) {
				  const audioLoader = new THREE.AudioLoader();
			audioLoader.load( 'Recording (5).m4a', function( buffer ) {
			  sound.setBuffer( buffer );
			  sound.setLoop( false );
			  sound.setVolume( 0.5 );
			  sound.play();
			});
				  scene.remove(coin);
				  coins.splice(i, 1);
				  
				}
			  }
			}
			
			function init() {
			camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
			camera.position.set( 0,  74.09897435791945,  52.927838827085445);
			scene = new THREE.Scene();
            scene.background = new THREE.Color( "grey" );
			const light = new THREE.DirectionalLight( 0xffffff, 0.5 );
			light.position.set( 0.5, 1, 0.75 );
			scene.add( light )
			controls = new PointerLockControls( camera, document.body );
			
			const blocker = document.getElementById( 'blocker' );
			const instructions = document.getElementById( 'instructions' );
			  instructions.addEventListener( 'click', function () {
			
			  controls.lock();
			
			} );
			
			controls.addEventListener( 'lock', function () {
			
				instructions.style.display = 'none';
			  blocker.style.display = 'none';
			
			} );
			
			controls.addEventListener( 'unlock', function () {
			
				blocker.style.display = 'block';
			  instructions.style.display = '';
			
			} );
			scene.add( controls.getObject() );
			
			const onKeyDown = function (event) {
			  switch (event.code) {
				case 'ArrowUp':
				case 'KeyW':
				  moveForward = true;
				  break;
			
				case 'ArrowLeft':
				case 'KeyA':
				  moveRight = true; 
				  break;
			
				case 'ArrowDown':
				case 'KeyS':
				  moveBackward = true;
				  break;
			
				case 'ArrowRight':
				case 'KeyD':
				  moveLeft = true; 
				  break;

				// case 'ShiftLeft':
				// 	cameraMoveSpeed = 1.5;
				// 	break;
				case 'KeyR':
					refreshPage();
					break;
				case 'Space':
				  console.log('Space key pressed');
				  if (!isJumping) {
					isJumping = true;
					velocityY = jumpStrength;
				  }	
			// 	  if (canJump === true){ velocity.y=jumpStrength;
			// 	  canJump = false;
			//   }
				  break;
			  }
			};
			
			const onKeyUp = function (event) {
			  switch (event.code) {
				case 'ArrowUp':
				case 'KeyW':
				  moveForward = false;
				  break;
			
				case 'ArrowLeft':
				case 'KeyA':
				  moveRight = false; 
				  break;
			
				case 'ArrowDown':
				case 'KeyS':
				  moveBackward = false;
				  break;
			
				case 'ArrowRight':
				case 'KeyD':
				  moveLeft = false; 
				  break;

				// case 'ShiftLeft':
				// 	cameraMoveSpeed = 1.5;
				// 	break;

				case 'Space':
					if (velocityY > 0) {
						velocityY = velocityY * 0.5; // You can adjust the factor as needed.
					  }
			  }
			};
			
					document.addEventListener( 'keydown', onKeyDown );
							document.addEventListener( 'keyup', onKeyUp );
					camera.add( listener );
							raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
					const capsuleGeo = new THREE.CapsuleGeometry(1, 2, 10, 30);
					const capsuleMat = new THREE.MeshStandardMaterial({ color: 'blue' });
					capsule = new THREE.Mesh(capsuleGeo, capsuleMat);
					scene.add(capsule);
					capsule.position.y = 3; 

                        
                            
							let floorGeometry = new THREE.BoxGeometry( 2000, 2000 );
					 		 floorGeometry.rotateX( - Math.PI / 2 );
                             const floorMaterial = new THREE.MeshStandardMaterial( { color:"silver"} );
			
					 		const floor = new THREE.Mesh( floorGeometry, floorMaterial );
							scene.add( floor );
							floor.position.y = -2;
							
					 		let position = floorGeometry.attributes.position;
			
					
					   spawnCoins(10);
			
					 }
								
			
						
			
			
					renderer = new THREE.WebGLRenderer( { antialias: true } );
							renderer.setPixelRatio( window.devicePixelRatio );
							renderer.setSize( window.innerWidth, window.innerHeight );
							document.body.appendChild( renderer.domElement );
			
							//
			
							window.addEventListener( 'resize', onWindowResize );
			
						//}
			
			const trailCapsules = [];
			
			
			function spawnCoins(numCoins) {
			  const coinGeometry = new THREE.SphereGeometry(2, 32, 32); 
			  const coinMaterial = new THREE.MeshStandardMaterial({ color: 0x000000}); 
			  coins.forEach(coin => scene.remove(coin));
			  coins.length = 0;
			  for (let i = 0; i < numCoins; i++) {
				const coin = new THREE.Mesh(coinGeometry, coinMaterial);
			
				
				coin.position.x = Math.random() * 200 - 100; 
				coin.position.z = Math.random() * 200 - 100; 
				coin.position.y += 3;
			
				scene.add(coin);
				coins.push(coin);
			  }
			}
			
			function onWindowResize() {
			
			  camera.aspect = window.innerWidth / window.innerHeight;
			  camera.updateProjectionMatrix();
			
			  renderer.setSize( window.innerWidth, window.innerHeight );
			
			}
			cameraMoveSpeed = 1;
			
// In your update/render loop (called at a fixed time step):
			function update() {
				if (isJumping) {
				camera.position.y += velocityY;
				velocityY -= gravity;
				
				if (camera.position.y <= 0) {
					camera.position.y = 0; // Ensure the camera doesn't go below the ground.
					isJumping = false;
					velocityY = 0;
				}
				}
			
				// Handle other character/camera movement and rendering here.
				// ...
			}
			function animate() {
			  requestAnimationFrame(animate);
			  const time = performance.now();
			  const delta = (time - prevTime) / 1000;
			
			  if (controls.isLocked === true) {
				capsule.position.copy(camera.position);
				const cameraDirection = new THREE.Vector3(0, 0, -1);
				cameraDirection.applyQuaternion(camera.quaternion);
				const cameraRotation = new THREE.Euler(0, 0, 0, 'YXZ');
				cameraRotation.setFromQuaternion(camera.quaternion);
			
				const moveDirection = new THREE.Vector3();
			
				if (moveForward) {
				  moveDirection.add(cameraDirection);
				}
				if (moveBackward) {
				  moveDirection.sub(cameraDirection);
				}
				if (moveLeft) {
				  
				  const cameraRotation = cameraDirection.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
				  moveDirection.add(cameraRotation);
				}
				if (moveRight) {
				  
				  const cameraRotation = cameraDirection.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
				  moveDirection.add(cameraRotation);
				}
			
				moveDirection.normalize();
				moveDirection.multiplyScalar(cameraMoveSpeed);
			
				capsule.translateX(moveDirection.x);
				capsule.translateZ(moveDirection.z);
			
				raycaster.ray.origin.copy(controls.getObject().position);
				raycaster.ray.origin.y -= 10;
			
				const intersections = raycaster.intersectObjects(objects, false);
				const onObject = intersections.length > 0;
			
				if (onObject === true) {
				  velocity.y = Math.max(0, velocity.y);
				  canJump = true;
				}
			
				controls.getObject().position.y += velocity.y * delta;
			
				if (controls.getObject().position.y < 10) {
				  velocity.y = 0;
				  controls.getObject().position.y = 10;
				  canJump = true;
				}
			  }
			
			  prevTime = time;
			
			  
				const trailCapsuleGeo = new THREE.SphereGeometry(1, 2, 10, 30);
				const trailCapsuleMat = new THREE.MeshStandardMaterial({ color: 'grey', transparent: true, opacity: 0.5 });
				const trailCapsule = new THREE.Mesh(trailCapsuleGeo, trailCapsuleMat);
				trailCapsule.position.copy(capsule.position);
				trailCapsule.rotation.copy(capsule.rotation);
				scene.add(trailCapsule);
			  
			  camera.position.lerp(capsule.position, cameraMoveSpeed);
			  raycaster.ray.origin.copy(controls.getObject().position);
			  raycaster.ray.origin.y -= 10;  
				
				trailCapsules.push(trailCapsule);
			  
				
				for (let i = trailCapsules.length - 1; i >= 0; i--) {
				  const trail = trailCapsules[i];
				  
				  trail.position.y -= 0.01;
				  trail.material.opacity -= 0.01;
				  if (trail.material.opacity <= 0) {
					scene.remove(trail);
					trailCapsules.splice(i, 1);
				  }
				}
			  checkCollisions();
			  
			  renderer.render(scene, camera);
			  onWindowResize();
			  update();
			}
			init();
			animate();