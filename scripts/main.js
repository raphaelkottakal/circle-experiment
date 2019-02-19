// global constants
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const gui = new dat.GUI();
const guiValues = new makeGuiValues();
const stats = new Stats();

// create elements
const camControls = new THREE.OrbitControls( camera );
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
const light = new THREE.DirectionalLight(0xffffff, 0.6);
const cube = new Cube({ color: 0x00ff00 });
// const points = makePoints({
//   count: 6,
//   radius: 64
// });
let points = [];
let movePhaseX = 0;
let movePhaseY = 0;
let movePhaseZ = 0;
setInterval(function() {
  if (points.length >= guiValues.maxPoints) {
    return
  }
  const point = makeSpherePoint(movePhaseX, movePhaseY, movePhaseZ, 32);
  // point.lookAt(scene.position);
  points.push(point);
  scene.add(point);
  movePhaseX += guiValues.xAdd;
  movePhaseY += guiValues.yAdd;
  movePhaseZ += guiValues.zAdd;
}, 1);

// config
stats.showPanel(0);
gui.close();
gui.add(guiValues, 'maxPoints', 100, 2000).step(1);
gui.add(guiValues, 'xAdd', 0, 1);
gui.add(guiValues, 'yAdd', 0, 1);
gui.add(guiValues, 'zAdd', 0, 1);
// gui.add(guiValues, 'addHelpers');
gui.add(guiValues, 'orbitCam');
gui.add(guiValues, 'autoRotate');
gui.add(guiValues, 'clear');
// gui.addColor(guiValues, 'color');
// camera
camControls.enableDamping = true;
camControls.enablePan = false;
camControls.enabled = false;
camControls.autoRotate = true;
camControls.autoRotateSpeed = -0.5;
camera.position.z = 64;
// light
light.position.x = 16;
light.position.y = 16;
light.position.z = 16;
// renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// add lighting
scene.add(light);
scene.add(ambientLight);
addPointsToScene(points);

// add meshes to scene
// scene.add(cube);

// animation
function animate() {
  stats.begin();
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  // makeCirclePoints(500);
  // rotatePoints(points);
  // console.log(points);
  setFromGui();
  camControls.update();
  stats.end();
	renderer.render(scene, camera);
}

animate();

// add renderer to dom
document.body.appendChild( stats.dom );
document.body.appendChild(renderer.domElement);
window.onresize = onResize;

// gui functions 
function setFromGui() {
  const color = new THREE.Color(guiValues.color[0] / 255, guiValues.color[1] / 255, guiValues.color[2] / 255);
  if (!cube.material.color.equals(color)) {
    cube.material.color.setRGB(guiValues.color[0] / 255, guiValues.color[1] / 255, guiValues.color[2] / 255);
    setPoitsColor(points, guiValues.color[0] / 255, guiValues.color[1] / 255, guiValues.color[2] / 255);
  }
  if (camControls.enabled !== guiValues.orbitCam) {
    camControls.enabled = guiValues.orbitCam;
  }
  if (camControls.autoRotate !== guiValues.autoRotate) {
    camControls.autoRotate = guiValues.autoRotate;
  }
}

function makeGuiValues() {
  this.maxPoints = 1250;
  this.xAdd = 0.11;
  this.yAdd = 0.23;
  this.zAdd = 0.12;
  this.color = [ 0, 255, 0 ];
  this.orbitCam = true;
  this.autoRotate = true;
  this.addHelpers = addHelpers;
  this.clear = function() {
    clearPoints(points);
    movePhaseX = 0;
    movePhaseY = 0;
    movePhaseZ = 0;
    points = [];
  }
};

function addHelpers() {
  const lightHelper = new THREE.DirectionalLightHelper(light, 4);
  scene.add(lightHelper);
}

// other functions
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}