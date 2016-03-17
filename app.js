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
var sphereGeometry = new THREE.SphereGeometry(100, 32, 32);
var sphereMaterial = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('360-nature.jpg') });
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// inverte sphere to 'look inside'
sphere.scale.x = -1;

// add sphere to the scene
scene.add(sphere);

// create plane and add it to the scene
var planeGeometry = new THREE.PlaneGeometry(4, 4);
var planeMaterial = new THREE.MeshBasicMaterial( {map: THREE.ImageUtils.loadTexture('preikestolen.jpg'), side: THREE.DoubleSide, transparent: true, opacity: 0.7} );
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.x = 5;
plane.position.y = -5;
plane.position.z = -15;
scene.add(plane);

// add gaze interaction
Reticulum.init(camera, {
  proximity: false,
  clickevents: true,
  near: null, //near factor of the raycaster (shouldn't be negative and should be smaller than the far property)
  far: null, //far factor of the raycaster (shouldn't be negative and should be larger than the near property)
  reticle: {
    visible: true,
    restPoint: 1000, //Defines the reticle's resting point when no object has been targeted
    color: 0xcc0000,
    innerRadius: 0,
    outerRadius: 0.01,
    hover: {
      color: 0xcc0000,
      innerRadius: 0.02,
      outerRadius: 0.024,
      speed: 5,
      vibrate: 50 //Set to 0 or [] to disable
    }
  },
  fuse: {
    visible: true,
    duration: 2.5,
    color: 0x00fff6,
    innerRadius: 0.045,
    outerRadius: 0.06,
    vibrate: 100, //Set to 0 or [] to disable
    clickCancelFuse: false //If users clicks on targeted object fuse is canceled
  }
});

Reticulum.add(plane, {
  clickCancelFuse: true, // Overrides global setting for fuse's clickCancelFuse
  reticleHoverColor: 0x00fff6, // Overrides global reticle hover color
  fuseVisible: true, // Overrides global fuse visibility
  fuseDuration: 1.5, // Overrides global fuse duration
  fuseColor: 0xcc0000, // Overrides global fuse color
  onGazeLong: function(){
      sphere.material.map = THREE.ImageUtils.loadTexture('preikestolen.jpg');
  }
});

scene.add(camera);

// render
var render = function(){
  Reticulum.update();
  controls.update();
  requestAnimationFrame(render);
  manager.render(scene, camera);
};

render();


};