window.onload = function() {

// add scene
var scene = new THREE.Scene();

// add camera and set camera position
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.x = 0.1;

// add renderer and append it to the DOM
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
  
// renderer.setFaceCulling( "front", "ccw" );

// add light
var light = new THREE.AmbientLight(0xffffff);
// light.position.set(0, 1, 1).normalize();
scene.add(light);

// create sphere
var geometry = new THREE.SphereGeometry(100, 32, 32);
var material = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('360-nature.jpg') });
var sphere = new THREE.Mesh(geometry, material);
// material.side = THREE.DoubleSide;

// inverte sphere
sphere.scale.x = -1;

// set position of and add sphere to the scene
// sphere.position.z = -50;
scene.add(sphere);

// rotate camera with the mouse
var controls = new THREE.OrbitControls(camera);
controls.noPan = true;
controls.noZoom = true; 
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

// render
var render = function(){
      requestAnimationFrame(render);
      // sphere.rotation.x += .01;
      // sphere.rotation.y += .01;
      renderer.render(scene, camera);
    };

render();


};