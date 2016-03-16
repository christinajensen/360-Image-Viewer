window.onload = function() {

// add scene
var scene = new THREE.Scene();

// add camera and set camera position
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.x = 0.1;

// add renderer and append it to the DOM
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// apply VR stereo rendering to renderer
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

// create camera controller for head tracking when on a mobile device
var controls = new THREE.VRControls(camera);

// create a VR manager helper to enter and exit VR mode
var manager = new WebVRManager(renderer, effect);

// add light
var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// create sphere
var geometry = new THREE.SphereGeometry(100, 32, 32);
var material = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('360-nature.jpg') });
var sphere = new THREE.Mesh(geometry, material);

// inverte sphere to 'look inside'
sphere.scale.x = -1;

// add sphere to the scene
scene.add(sphere);

// render
var render = function(){
  controls.update();
  requestAnimationFrame(render);
  manager.render(scene, camera);
};

render();


};