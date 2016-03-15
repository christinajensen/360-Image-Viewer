window.onload = function() {

// add scene
var scene = new THREE.Scene();
// camera and set camera position
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.x = 0.1;

// add renderer and append it to the DOM
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// adding light
var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);

// create sphere
var geometry = new THREE.SphereGeometry(20, 32, 32);
var material = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('360-nature.jpg') });
var sphere = new THREE.Mesh(geometry, material);
// add sphere to the scene
sphere.position.z = -50;
// sphere.scale.x = -1;
scene.add(sphere);

// render
var render = function(){
      requestAnimationFrame(render);
      // sphere.rotation.x += .01;
      // sphere.rotation.y += .01;
      renderer.render(scene, camera);
    };

render();


};