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
var sphereGeometry = new THREE.SphereGeometry(1000, 32, 32);
var sphereMaterial = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('360-nature.jpg') });
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// inverte sphere to 'look inside'
sphere.scale.x = -1;

// add sphere to the scene
scene.add(sphere);

// create plane and add it to the scene
// var bgPlaneGeo = new THREE.PlaneGeometry(3.5, 3.5);
// var bgPlaneMat = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
// var bgPlane = new THREE.Mesh(bgPlaneGeo, bgPlaneMat);
// bgPlane.position.x = -10;
// bgPlane.position.y = 8;
// bgPlane.position.z = -20;
// scene.add(bgPlane);

var plane1Geometry = new THREE.PlaneGeometry(3, 3);
var plane1Material = new THREE.MeshBasicMaterial( {map: THREE.ImageUtils.loadTexture('preikestolen.jpg'), side: THREE.DoubleSide} );
var plane1 = new THREE.Mesh(plane1Geometry, plane1Material);
plane1.position.x = -10;
plane1.position.y = 8;
plane1.position.z = -20;
scene.add(plane1);

// create more planes..
var plane2Geometry = new THREE.PlaneGeometry(3, 3);
var plane2Material = new THREE.MeshBasicMaterial( {map: THREE.ImageUtils.loadTexture('360-nature.jpg'), side: THREE.DoubleSide, transparent: true, opacity: 0.7} );
var plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
plane2.position.x = -5;
plane2.position.y = 8;
plane2.position.z = -20;
scene.add(plane2);

var plane3Geometry = new THREE.PlaneGeometry(3, 3);
var plane3Material = new THREE.MeshBasicMaterial( {map: THREE.ImageUtils.loadTexture('bergsjostolen.jpg'), side: THREE.DoubleSide, transparent: true, opacity: 0.7} );
var plane3 = new THREE.Mesh(plane3Geometry, plane3Material);
plane3.position.x = 0;
plane3.position.y = 8;
plane3.position.z = -20;
scene.add(plane3);

// add gaze interaction
Reticulum.init(camera, {
  proximity: false,
  clickevents: true,
  near: null, //near factor of the raycaster (shouldn't be negative and should be smaller than the far property)
  far: null, //far factor of the raycaster (shouldn't be negative and should be larger than the near property)
  reticle: {
    visible: true,
    restPoint: 400, //Defines the reticle's resting point when no object has been targeted
    color: 0xcc0000,
    innerRadius: 0.009,
    outerRadius: 0.015,
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

Reticulum.add(plane1, {
  clickCancelFuse: true, // Overrides global setting for fuse's clickCancelFuse
  reticleHoverColor: 0x00fff6, // Overrides global reticle hover color
  fuseVisible: true, // Overrides global fuse visibility
  fuseDuration: 1.5, // Overrides global fuse duration
  fuseColor: 0xcc0000, // Overrides global fuse color
  onGazeLong: function(){
      sphere.material.map = THREE.ImageUtils.loadTexture('preikestolen.jpg');
  }
});

// more planes..
Reticulum.add(plane2, {
  clickCancelFuse: true, // Overrides global setting for fuse's clickCancelFuse
  reticleHoverColor: 0x00fff6, // Overrides global reticle hover color
  fuseVisible: true, // Overrides global fuse visibility
  fuseDuration: 1.5, // Overrides global fuse duration
  fuseColor: 0xcc0000, // Overrides global fuse color
  onGazeLong: function(){
      sphere.material.map = THREE.ImageUtils.loadTexture('360-nature.jpg');
  }
});

Reticulum.add(plane3, {
  clickCancelFuse: true, // Overrides global setting for fuse's clickCancelFuse
  reticleHoverColor: 0x00fff6, // Overrides global reticle hover color
  fuseVisible: true, // Overrides global fuse visibility
  fuseDuration: 1.5, // Overrides global fuse duration
  fuseColor: 0xcc0000, // Overrides global fuse color
  onGazeLong: function(){
      sphere.material.map = THREE.ImageUtils.loadTexture('bergsjostolen.jpg');
  }
});

scene.add(camera);

// add audio
// var listener = new THREE.AudioListener();
// camera.add(listener);
// var sound = new THREE.Audio(listener);
// sound.load("waterfall.wav");
// sound.repeat = true;
// sound.autoplay = true;

// scene.add(sound);

// render
var render = function(){
  Reticulum.update();
  controls.update();
  requestAnimationFrame(render);
  manager.render(scene, camera);
};

render();


};